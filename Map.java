public class Map {

    public double[][] graph;
    public Node[] nodes;

    public Map(int n){
        this.graph = new double[n][n];
        this.nodes = new Node[n];

    }

    public void fillNode(int id,String nodoNombre,double x,double y,String tipoNodo,int tipoEstacion){
        this.nodes[id] = new Node(id, nodoNombre, x, y, tipoNodo, tipoEstacion);

    }

    public void fillGraph(){
        FindDistance finder = new FindDistance();

        for (int i = 0; i < graph.length; i++) {
            for (int j = 0; j < graph.length; j++) {
                this.graph[i][j] = finder.pythagorean(this.nodes[i].x,this.nodes[i].y,this.nodes[j].x,this.nodes[j].y);
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

    
}
