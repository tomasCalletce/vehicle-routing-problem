import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

public class Map {

    public double[][] graph;
    public Node[] nodes;
    public Node depot;
    public HashMap<Integer,ArrayList<Node>> routes;
    public double speed;
    public double rate;
    public double capacidadMaximadebateriaendistancia;
 



    public Map(int n,double speed,double rate){
        this.graph = new double[n][n];
        this.nodes = new Node[n];
        this.speed = speed;
        this.rate = rate;
        this.routes = new HashMap<>();

    }

 

    public void addDepot(int id,String nodoNombre,double x,double y,String tipoNodo,int tipoEstacion){
        if(!nodoNombre.equals("depot")){
            System.out.println("ADD DEPOT");
        }else{
            this.depot = new Node(id, nodoNombre, x, y, tipoNodo, tipoEstacion,0);
            this.nodes[id] = this.depot;
        }

    }

    public void fillNode(int id,String nodoNombre,double x,double y,String tipoNodo,int tipoEstacion,double tiempoParaCargarAl100){
        if(this.depot == null){
            System.out.println("ADD DEPOT");
        }else{
            this.nodes[id] = new Node(id, nodoNombre,x,y, tipoNodo, tipoEstacion,tiempoParaCargarAl100);
        }
        
    }

    public void fillGraph(){
        FindDistance finder = new FindDistance();
        for (int i = 0; i < graph.length; i++) {

            Node ni = null;
            for (int jj = 0; jj < graph.length; jj++) {
                if(i == this.nodes[jj].id){
                    ni = this.nodes[jj];
                }
            }

            for (int j = 0; j < graph.length; j++) {
                Node nj = null;

                for (int jj = 0; jj < graph.length; jj++) {
                    if(j == this.nodes[jj].id){
                        nj = this.nodes[jj];
                    }
                }
                this.graph[i][j] = finder.pythagorean(ni.x,ni.y,nj.x,nj.y);
            }
        }
    } 

    private double getAngle(double x,double y){

        double adder = 0;
        if(x >= 0 && y >= 0){
            adder = 0;
        }else if(x < 0 && y > 0){
            adder = 3.14159;
        }else if(x < 0 && y < 0){
            adder = 3.14159;
        }else if(x > 0 && y < 0){
            adder = 6.28319;
        }

        return adder+Math.atan(y/x);


    }

    public void organizeNodesByAngle(){

        int n = this.nodes.length;
        for (int i = 0; i < n; i++) {
            this.nodes[i].angle = getAngle(this.nodes[i].x,this.nodes[i].y);
        }
        for (int i = 0; i < n-1; i++){
            for (int j = 0; j < n-i-1; j++){
                Node n0 = this.nodes[j];
                Node n1 = this.nodes[j+1];
                if(getAngle(n0.x,n0.y) > getAngle(n1.x,n1.y)){
                    this.nodes[j] = n1;
                    this.nodes[j+1] = n0;
                }
            }
        }
    }

    public void printGraph(){

        System.out.println("");

        for (int i = 0; i < graph.length; i++) {
            System.out.print("[");
            for (int j = 0; j < graph.length; j++) {
                System.out.print(this.graph[i][j]+", ");
            }
            System.out.println("]");
        }

        System.out.println("");
    }

    public int makeRoutes(double range,double speed,double timpoMaximoDeRuta,double tiempoDeCarga){

        FindDistance distanceFinder = new FindDistance();
        int routesCounter = 0;
        int nodeCounter = 1;
       

        while(nodeCounter < this.nodes.length){

      
            Stack<Node> incluidos = new Stack<>();
            incluidos.add(this.depot);
            double rangeLeft = range;
            double hoursUsed = timpoMaximoDeRuta;


            while(rangeLeft>0 && hoursUsed>0 && nodeCounter < this.nodes.length){

                Node current = this.nodes[nodeCounter];
                Node last = incluidos.peek();
                double distance = this.graph[last.id][current.id];
                rangeLeft = rangeLeft - distance;
                hoursUsed = hoursUsed - (distance/speed);
                if(current.tipoNodo.equals("s") && rangeLeft>0 && hoursUsed>0){
                    hoursUsed = hoursUsed - tiempoDeCarga;
                    rangeLeft = range;
                }
                incluidos.add(current);
                distance = this.graph[current.id][this.depot.id];
                rangeLeft = rangeLeft - distance;
                hoursUsed = hoursUsed - (distance/speed);
                nodeCounter++;
            }

            if(incluidos.size() == 2){
                this.routes.put(routesCounter,new ArrayList<>(incluidos));
                continue;
            }

            incluidos.pop();
            nodeCounter--;
            this.routes.put(routesCounter,new ArrayList<>(incluidos));
            routesCounter++;

        }

        return routesCounter;

    }
    
}
