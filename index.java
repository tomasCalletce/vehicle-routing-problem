import java.util.ArrayList;
import java.util.HashMap;

public class index {

    public static void main(String[] args) {
        System.out.println("SIZAS");

        Map map = ReadFiles.readFile("tc2c320s24cf0.txt", 1.01);
        double rangeOfMotor = ReadFiles.Q / ReadFiles.r;
        // map.printGraph();

        // for (int i = 0; i < ReadFiles.n; i++) {

        // System.out.println("(" + map.nodes[i].x + "," + map.nodes[i].y + ")" +
        // map.nodes[i].id);
        // }

        // System.out.println();

        HashMap<Integer, ArrayList<Node>> routes = map.makeRoutes2(rangeOfMotor, ReadFiles.Tmax);
        for (int i = 0; i <= routes.size(); i++) {
            ArrayList<Node> lis = routes.get(i);
            for (int j = 0; lis != null && j < lis.size(); j++) {
                System.out.print(lis.get(j).id + " ");
            }
            System.out.println(" ");
        }
        System.out.println(map.routes.get(0).size());

        System.out.println(" ");
        // }
        ArrayList<ArrayList<Node>> szs = new ArrayList<ArrayList<Node>>();
        for (int i = 4; i < routes.size() - 1; i++) {
            map.tspAuxiliar(routes.get(i), 1, 0, rangeOfMotor, ReadFiles.Tmax);
        }

        // System.out.print("{");
        // System.out.println(map.optimalRoutes.get(1).size() + "siza");
        // for (int i = 4; i < map.optimalRoutes.size(); i++) {
        // System.out.println("[ ");
        // for (int j = 0; j < map.optimalRoutes.get(i).size(); j++) {
        // System.out.print(map.optimalRoutes.get(i).get(j).id + "->");
        // }
        // System.out.println("]");
        // }
        // System.out.println("};");

    }

}
// 0,97,99,98,100,57,60,94,0,
// [0, 71, 95, 233, 235, 159, 0, ];0 175 13 174 0