public class Node {

    public int id;
    public String nodoNombre;
    public double x;
    public double y;
    public String tipoNodo;
    public int tipoEstacion;

    public Node(int id,String nodoNombre,double x,double y,String tipoNodo,int tipoEstacion){
        this.id = id;
        this.nodoNombre = nodoNombre;
        this.x = x;
        this.y = y;
        this.tipoNodo= tipoNodo;
        this.tipoEstacion = tipoEstacion;
    }

}
