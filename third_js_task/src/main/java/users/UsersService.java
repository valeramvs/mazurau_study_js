package users;

import java.util.ArrayList;

public class UsersService {
    public String validSignUp(String userEmail, String userLogin, String userPassword) {
        ArrayList<String[]> listOfUsers = Users.getInstance().getUsers();
        boolean term = true;
        for (int i = 0; i < listOfUsers.size(); i++) {
            String[] array = listOfUsers.get(i);
            if (userEmail.equals(array[0])) {
                System.out.println("Email '" + array[0] + "' is busy.");
                term = false;
                return "Email is busy";
            } else {
                if (userLogin.equals(array[1])) {
                    System.out.println("Login '" + array[1] + "' is busy.");
                    term = false;
                    return "Login is busy";
                }
            }
        }
        if (term) {
            String[] user = new String[] {userEmail, userLogin, userPassword};
            Users.getInstance().setUser(user);
        }
        return "Registration was successful";
    }

    public String validSignIn(String userLogin, String userPassword) {
        ArrayList<String[]> listOfUsers = Users.getInstance().getUsers();
        for (int i = 0; i < listOfUsers.size(); i++) {
            String[] array = listOfUsers.get(i);
            if (userLogin.equals(array[1])) {
                if (userPassword.equals(array[2])) {
                    System.out.println("Login and password are correct. Authorization was successful");
                    return "Login and password are correct. Authorization was successful";
                } else {
                    System.out.println("Password is not correct. Check your password");
                    return "Password is not correct. Check your password";
                }
            }
        }
        System.out.println("Login does not exist. Check your login or sign up");
        return "Login does not exist. Check your login or sign up";
    }
}
