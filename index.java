import java.util.ArrayList;

public class index{

    public static void main(String[] args) {

        Map map = ReadFiles.readFile("tc2c320s24cf0.txt",1.01);
        double rangeOfMotor = ReadFiles.Q/ReadFiles.r;

        System.out.println(rangeOfMotor);
        //map.printGraph();


        System.out.println();

        // for (int i = 0; i < ReadFiles.n; i++) {
            
        //     System.out.println("(" + map.nodes[i].x + "," + map.nodes[i].y + ")" + map.nodes[i].id);
        // }

        System.out.println();
        
        int routesNumber = map.makeRoutes2(rangeOfMotor,ReadFiles.speed,ReadFiles.Tmax);
        for (int i = 0; i <= routesNumber; i++) {
            ArrayList<Node> lis = map.routes.get(i);
            for (int j = 0;lis != null && j < lis.size(); j++) {
                System.out.print(lis.get(j).id + " ");
            }
            System.out.println("  ");
        }

        
    }

}

