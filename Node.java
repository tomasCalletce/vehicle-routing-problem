public class Node {

    public int id;
    public String nodoNombre;
    public double x;
    public double y;
    public String tipoNodo;
    public int tipoEstacion;
    public double angle = 0;
    public double tiempoDeCargaAl100;

    public Node(int id,String nodoNombre,double x,double y,String tipoNodo,int tipoEstacion,double tiempoDeCargaAl100){
        this.id = id;
        this.nodoNombre = nodoNombre;
        this.x = x;
        this.y = y;
        this.tipoNodo= tipoNodo;
        this.tipoEstacion = tipoEstacion;
        this.tiempoDeCargaAl100 = tiempoDeCargaAl100;
    }

}
