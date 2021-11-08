public class index{

    public static void main(String[] args) {
        int n = 5; // numero de nodos;
        int m = 2; //Número de clientes
        int u = 2; //Número de estaciones 
        int breaks = 4; // Número de puntos de soporte de la función de la carga de la batería
        double r = 125; // Tasa de consumo en watts hora por kilómetro
        double speed = 40.0; //Velocidad en kilómetros por hora
        double Tmax = 10; //Tiempo máximo de duración de laruta de un vehículo en horas
        double Smax = 2.04; //Tiempo máximo de carga en horas en la estación más lenta
        double st_customer = 0.5; //Tiempo en horas que se demora visitando un cliente
        double Q = 16000.0; // Capacidad de la batería en watts hora

        Map map = new Map(n,speed,r);
        map.addDepot(0,"depot",45.35,5.63,"d",0);
        map.fillNode(1,"c0",6.01,9.52,"c",0,0);
        map.fillNode(2,"c1",10.01,9.52,"c",0,0);
        map.fillNode(3,"s0",82.04,37.54,"s",1,1.01);
        map.fillNode(4,"s1",18.29,102.2,"s",0,2.04);
        map.organizeNodesByAngle();
        map.fillGraph();
        map.printGraph();

        


    }

}
