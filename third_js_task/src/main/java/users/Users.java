package users;

import java.util.ArrayList;

public class Users {
    private static final Users INSTANCE = new Users();
    private String[] user;
    private ArrayList<String[]> users = new ArrayList<>();


    private Users(){
        users.add(new String[]{"valeramvs@mail.ru", "valeramvs", "qwerty1%"});
        users.add(new String[]{"example@ya.ru", "example", "example1%"});
        users.add(new String[]{"example2@ya.ru", "example2", "example2%"});
    }

    public static Users getInstance() {
        return INSTANCE;
    }

    public String[] getUser() {
        return user;
    }

    public void setUser(String[] user) {
        this.user = user;
        users.add(user);
    }

    public ArrayList<String[]> getUsers() {
        return users;
    }

    public void setUsers(ArrayList<String[]> user) {
        this.users = users;
    }
}
