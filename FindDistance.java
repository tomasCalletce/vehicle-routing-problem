public class FindDistance{


    public double pythagorean(double x1,double y1,double x2,double y2){

        double base = 0;
        double height = 0;

        if(x1 >= x2){
            base = x1-x2;
        }
        if(x1 < x2){
            base = x2-x1;
        }
        if(y1 >= y2){
            height = y1-y2;
        }
        if(y1 < y2){
            height = y2-y1;
        }

        base =  Math.pow(base,2);
        height = Math.pow(height,2);
        double hypo = Math.sqrt(base+height);
        return hypo;

    }

   

}