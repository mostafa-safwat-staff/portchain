import { FastifyReply, FastifyRequest } from 'fastify';
import loadCursorBatch from '../../util/loadCursorBatch';
import { quantileSeq } from 'mathjs';
import { DateTime } from 'luxon';

export const getStatistics = async (req: FastifyRequest, reply: FastifyReply) => {
    const { portChainService } = req.server;

    const portVisitCounts = new Map<string, number>();
    const portDurationsMap = new Map<string, number[]>();

    const vessels = await portChainService.getVessels();

    for await (const batch of loadCursorBatch(vessels, 3)) {
        const schedules = await Promise.all(
            batch.map((vessel) => portChainService.getPortCallsSchedules(vessel.imo))
        );

        schedules.flatMap((schedule) => schedule.portCalls)
            .filter((portCall) => !portCall.isOmitted)
            .forEach((portCall) => {
                const portId = portCall.port.id;

                // Update visit count for the port
                const currentCount = portVisitCounts.get(portId) || 0;
                portVisitCounts.set(portId, currentCount + 1);

                // Calculate the duration of the port call
                const arrivalTime = DateTime.fromISO(portCall.arrival);
                const departureTime = DateTime.fromISO(portCall.departure);
                const durationInHours = departureTime.diff(arrivalTime, 'hours').hours;

                // Update the list of durations for the port
                const durations = portDurationsMap.get(portId) || [];
                durations.push(durationInHours);
                portDurationsMap.set(portId, durations);
            });
    }

    const statistics = computeStatistics(portVisitCounts, portDurationsMap);

    return await reply.send(statistics);
};

function computeStatistics(
    portVisitCounts: Map<string, number>,
    portDurationsMap: Map<string, number[]>
) {
    const sortedPortsByVisits = Array.from(portVisitCounts.entries())
        .sort(([, countA], [, countB]) => countB - countA);

    // Extract top 5 and bottom 5 ports based on visit counts
    const top5Ports = sortedPortsByVisits.slice(0, 5);
    const bottom5Ports = sortedPortsByVisits.slice(-5);

    // Compute percentiles for each port's durations
    const percentileThresholds = [5, 20, 50, 75, 90];
    const portDurationStatistics = Array.from(portDurationsMap.entries()).map(
        ([portId, durations]) => {
            const sortedDurations = durations.sort((a, b) => a - b);

            const percentiles = percentileThresholds.reduce((acc, percentile) => {
                acc[percentile] = quantileSeq(sortedDurations, percentile / 100, true).toFixed(2);
                return acc;
            }, {} as Record<number, string>);

            return { port: portId, ...percentiles };
        }
    );

    return { top5Ports, bottom5Ports, portDurationStatistics };
}
