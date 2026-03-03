export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

let users: User[] = []; // временное хранилище

export const registerUser = async (user: Omit<User, "id">): Promise<User> => {
  // проверка, что пользователь не существует
  if (users.find((u) => u.email === user.email)) {
    throw new Error("Пользователь с таким email уже существует");
  }
  const newUser: User = { id: Date.now(), ...user };
  users.push(newUser);
  return newUser;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Неверный email или пароль");
  return user;
};
