import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;
import java.util.Spliterator.OfPrimitive;
import java.util.spi.CurrencyNameProvider;

public class Map {

    public double[][] graph;
    public Node[] nodes;
    public Node depot;
    public HashMap<Integer, ArrayList<Node>> routes;
    public ArrayList<ArrayList<Node>> optimalRoutes;
    public double speed;
    public double rate;
    public double capacidadMaximadebateriaendistancia;

    public double shortestDistance = 1000000;
    public ArrayList<Node> shortestPath;
    public double rango;
    public double tMAX;

    public Map(int n, double speed, double rate) {
        this.graph = new double[n][n];
        this.nodes = new Node[n];
        this.speed = speed;
        this.rate = rate;
        this.routes = new HashMap<>();
        this.shortestPath = new ArrayList<Node>();
        this.optimalRoutes = new ArrayList<ArrayList<Node>>();

    }

    public void addDepot(int id, String nodoNombre, double x, double y, String tipoNodo, int tipoEstacion) {
        if (!nodoNombre.equals("depot")) {
            System.out.println("ADD DEPOT");
        } else {
            this.depot = new Node(id, nodoNombre, x, y, tipoNodo, tipoEstacion, 0);
            this.nodes[id] = this.depot;
        }

    }

    public void fillNode(int id, String nodoNombre, double x, double y, String tipoNodo, int tipoEstacion,
            double tiempoParaCargarAl100) {
        if (this.depot == null) {
            System.out.println("ADD DEPOT");
        } else {
            this.nodes[id] = new Node(id, nodoNombre, x - this.depot.x, y - this.depot.y, tipoNodo, tipoEstacion,
                    tiempoParaCargarAl100);
        }

    }

    public void fillGraph() {

        this.nodes[0].x = 0;
        this.nodes[0].y = 0;

        FindDistance finder = new FindDistance();
        for (int i = 0; i < graph.length; i++) {

            Node ni = null;
            for (int jj = 0; jj < graph.length; jj++) {
                if (i == this.nodes[jj].id) {
                    ni = this.nodes[jj];
                }
            }

            for (int j = 0; j < graph.length; j++) {
                Node nj = null;

                for (int jj = 0; jj < graph.length; jj++) {
                    if (j == this.nodes[jj].id) {
                        nj = this.nodes[jj];
                    }
                }
                this.graph[i][j] = finder.pythagorean(ni.x, ni.y, nj.x, nj.y);
            }
        }
    }

    private double getAngle(double x, double y) {

        double adder = 0;
        if (x >= 0 && y >= 0) {
            adder = 0;
        } else if (x < 0 && y > 0) {
            adder = 3.14159;
        } else if (x < 0 && y < 0) {
            adder = 3.14159;
        } else if (x > 0 && y < 0) {
            adder = 6.28319;
        }

        return adder + Math.atan(y / x);

    }

    public void organizeNodesByAngle() {

        int n = this.nodes.length;
        for (int i = 0; i < n; i++) {
            this.nodes[i].angle = getAngle(this.nodes[i].x, this.nodes[i].y);
        }
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                Node n0 = this.nodes[j];
                Node n1 = this.nodes[j + 1];
                if (getAngle(n0.x, n0.y) > getAngle(n1.x, n1.y)) {
                    this.nodes[j] = n1;
                    this.nodes[j + 1] = n0;
                }
            }
        }
    }

    public void printGraph() {

        System.out.println("");

        for (int i = 0; i < graph.length; i++) {
            System.out.print("[");
            for (int j = 0; j < graph.length; j++) {
                System.out.print(this.graph[i][j] + ", ");
            }
            System.out.println("]");
        }

        System.out.println("");
    }

    public HashMap<Integer, ArrayList<Node>> makeRoutes2(double range, double timpoMaximoDeRuta) {
        int routesCounter = 0;
        int nodeCounter = 1;
        while (nodeCounter < this.nodes.length) {
            Stack<Node> sta = new Stack<>();
            sta.add(this.depot);
            double timeLeft = timpoMaximoDeRuta;
            double rangeLeft = range;
            double lastDistnaceToComeBack = 0;
            while (timeLeft > 0 && rangeLeft > 0 && nodeCounter < this.nodes.length) {
                Node current = this.nodes[nodeCounter];
                rangeLeft = rangeLeft - this.graph[sta.peek().id][current.id];
                timeLeft = timeLeft - (this.graph[sta.peek().id][current.id] / speed);
                if (current.tipoNodo.equals("s") && timeLeft > 0 && rangeLeft > 0) {
                    timeLeft = timeLeft - current.tiempoDeCargaAl100;
                    rangeLeft = range;
                }
                sta.add(current);
                rangeLeft = rangeLeft - this.graph[0][current.id];
                timeLeft = timeLeft - (this.graph[0][current.id] / speed);
                rangeLeft = rangeLeft + lastDistnaceToComeBack;
                lastDistnaceToComeBack = this.graph[0][current.id];
                nodeCounter++;
            }
            if (timeLeft < 0 || rangeLeft < 0) {

                if (sta.size() == 2) {
                    continue;
                }
                sta.pop();
                sta.add(depot);
                this.routes.put(routesCounter, new ArrayList<>(sta));
                nodeCounter--;
            } else {
                sta.add(depot);
                this.routes.put(routesCounter, new ArrayList<>(sta));
            }

            routesCounter++;
        }

        return routes;
    }

    public void tspAuxiliar(ArrayList<Node> cities, int startCity, double currentDistance, double range, double tMAX) {
        shortestDistance = 1000000;

        if (shortestPath.size() > 0) {

            shortestPath.clear();
        }
        tsp(cities, startCity, currentDistance, range, tMAX);
        for (int i = 0; i < shortestPath.size(); i++) {
            System.out.print(shortestPath.get(i).id + "->");
        }
        System.out.println("// distance: " + this.shortestDistance);
        this.optimalRoutes.add(this.shortestPath);
    }

    public void tsp(ArrayList<Node> cities, int startCity, double currentDistance, double range, double tMAX) {
        if (startCity < cities.size() - 1) {
            for (int i = startCity; i < cities.size(); i++) {// cada iteración hace todas las permutaciones empezando
                                                             // desde el iesimo, por eso es el swap
                Node tempCity = cities.get(i);
                cities.set(i, cities.get(startCity));
                cities.set(startCity, tempCity);
                currentDistance = computeDistance(cities, range, tMAX);
                tsp(cities, startCity + 1, currentDistance, range, tMAX);
                tempCity = cities.get(i);
                cities.set(i, cities.get(startCity));
                cities.set(startCity, tempCity);
            }
        } else {

            if (shortestDistance > currentDistance) {
                shortestDistance = currentDistance;
                shortestPath = new ArrayList<Node>(cities);
            }
        }
    }

    private double computeDistance(ArrayList<Node> cities, double range, double tMAX) {
        double distance = 0;
        double timpoMaximoDeRuta = tMAX;
        for (int i = 0; i < cities.size() - 1; i++) {
            // System.out.println("SIZAS: " + this.graph[cities.get(i).id][cities.get(i +
            // 1).id]);
            // System.out.println("DIST: " + distance);
            distance = distance + this.graph[cities.get(i).id][cities.get(i + 1).id];
        }

        distance = distance + this.graph[cities.get(cities.size() - 1).id][cities.get(0).id];
        range -= this.graph[cities.get(cities.size() - 1).id][cities.get(0).id];
        timpoMaximoDeRuta -= (this.graph[cities.get(cities.size() - 1).id][cities.get(0).id] / speed);

        return (range > 0 && timpoMaximoDeRuta > 0) ? distance : 100000;
    }
}
