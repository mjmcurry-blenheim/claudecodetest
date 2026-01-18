// User service with TypeScript bugs

interface User {
  id: number;
  name: string;
  email?: string;
}

class UserService {
  private users: User[] = [];

  // Bug: No null check for optional email
  sendEmail(user: User): void {
    const emailAddress = user.email.toLowerCase();
    console.log(`Sending email to ${emailAddress}`);
  }

  // FIXME: Race condition - not thread safe
  addUser(user: User): void {
    const exists = this.users.find(u => u.id === user.id);
    if (!exists) {
      this.users.push(user);
    }
  }

  // Bug: Array index out of bounds
  getFirstThreeUsers(): User[] {
    return [this.users[0], this.users[1], this.users[2]];
  }

  // Bug: Incorrect null check
  isValidUser(user: User | null): boolean {
    if (user) {
      return user.name.length > 0;
    }
    return false;
  }

  // FIXME: Memory leak - event listeners not removed
  subscribeToUpdates(callback: Function): void {
    window.addEventListener('user-update', callback as EventListener);
    // No cleanup mechanism
  }

  // Bug: Async function without error handling
  async fetchUserData(userId: number): Promise<User> {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  }
}

export default UserService;
