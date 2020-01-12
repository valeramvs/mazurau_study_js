package servlet;

import org.json.JSONObject;
import users.UsersService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/servlet.ServletSignIn")
public class ServletSignIn extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userLogin = null;
        String userPassword = null;
        StringBuffer sb = new StringBuffer();
        String line = null;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        JSONObject jsonObject = new JSONObject(sb.toString());
        userLogin = jsonObject.getString("login");
        userPassword = jsonObject.getString("password");
        System.out.println("Data from form: " + userLogin + " " + userPassword);
        UsersService service = new UsersService();
        String validation = service.validSignIn(userLogin, userPassword);
        response.getWriter().write(validation);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Enter doGet");
    }
}
