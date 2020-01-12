package servlet;

import org.json.JSONObject;
import users.Users;
import users.UsersService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/servlet.ServletSignUp")
public class ServletSignUp extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userEmail = null;
        String userLogin = null;
        String userPassword = null;
        StringBuffer sb = new StringBuffer();
        String line = null;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        JSONObject jsonObject = new JSONObject(sb.toString());
        userEmail = jsonObject.getString("email");
        userLogin = jsonObject.getString("login");
        userPassword = jsonObject.getString("password");
        System.out.println("Data from form: " + userEmail + " " + userLogin + " " + userPassword);
        UsersService service = new UsersService();
        String validation = service.validSignUp(userEmail, userLogin, userPassword);
        response.getWriter().write(validation);

        System.out.println("List of users:");
        ArrayList<String[]> list = Users.getInstance().getUsers();
        for (int i = 0; i < list.size(); i++) {
            String[] array = list.get(i);
            System.out.println(array[0] + " " + array[1] + " " + array[2]);
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Enter doGet");
    }
}
