
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BruteForceTsp {

    public List<String> findOptimalRoute(Map<String, Map<String, Integer>> distanceMap) {

        List<String> cities = new ArrayList<>(distanceMap.keySet());
        // Generating all possible permutations.
        List<List<String>> allPermutations = PermutationGenerator.getAllPermutations(cities);

        List<String> optimalRoute = List.of();
        int optimalDistance = Integer.MAX_VALUE;

        for (List<String> candidateRoute : allPermutations) {
            // Per permutation, we calculate the total distance.
            int currentRouteDistance = TravellingHelper.calculateDistance(candidateRoute, distanceMap);
            // If it's shorter than what we found so far, we store it.
            if (currentRouteDistance < optimalDistance) {
                optimalRoute = candidateRoute;
                optimalDistance = currentRouteDistance;
            }
        }

        return optimalRoute;
    }

}