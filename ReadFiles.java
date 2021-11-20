import java.io.BufferedReader;
import java.io.FileReader;

public class ReadFiles {

    static int n, m, u, breaks;
    static double r, speed, Tmax, Smax, st_customer, Q;
    static Map map;

    public static Map readFile(String fileName,double tcarga){

        try {
            String linea;
            String lineaPartida[];
            BufferedReader br = new BufferedReader(new FileReader("./DataFiles/"+fileName));
            double[] valores = new double[10];
            for (int i = 0; i < 10; i++) {
                linea = br.readLine();
                lineaPartida = linea.split(" ");
                valores[i] = Float.parseFloat(lineaPartida[2]);
            }

            n = (int) valores[0];
            m = (int) valores[1];
            u = (int) valores[2];
            breaks = (int) valores[3];
            r = valores[4];
            speed = valores[5];
            Tmax = valores[6];
            Smax = valores[7];
            st_customer = valores[8];
            Q = valores[9];

            br.readLine();
            br.readLine();
            br.readLine();


            map = new Map(n,speed,r);
            linea = br.readLine();
            lineaPartida = linea.split(" ");
            int id = Integer.parseInt(lineaPartida[0]);
            String nodoNombre = lineaPartida[1];
            double x = Double.parseDouble(lineaPartida[2]);
            double y = Double.parseDouble(lineaPartida[3]);
            String tipoNodo = lineaPartida[4];
            int tipoEstacion = Integer.parseInt(lineaPartida[5]);
            map.addDepot(id, nodoNombre, x, y, tipoNodo, tipoEstacion);
            
           
            for (int i = 1; i < n; i++) {
                linea = br.readLine();
                lineaPartida = linea.split(" ");
                id = Integer.parseInt(lineaPartida[0]);
                 nodoNombre = lineaPartida[1];
                 x = Double.parseDouble(lineaPartida[2]);
                 y = Double.parseDouble(lineaPartida[3]);
                 tipoNodo = lineaPartida[4];
                tipoEstacion = Integer.parseInt(lineaPartida[5]);
                map.fillNode(id, nodoNombre, x, y, tipoNodo, tipoEstacion, tcarga);
            }

            
        }catch (Exception ex) {
            System.out.println(ex);
        }

        map.organizeNodesByAngle();
        map.fillGraph();
        return map;

    }
    
}
