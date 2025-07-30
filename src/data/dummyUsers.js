const dummyUsers = [
  {
    name: "Alice Individual",
    email: "alice.individual@example.com",
    password: "password", // plaintext for seeding, your code hashes it
    role: "individual",
    isActive: true,
    lastLogin: new Date("2025-07-28T10:00:00Z"),
    detectionsCount: 15,
  },
  {
    name: "Beta Business",
    email: "contact@betabusiness.com",
    password: "password", // plaintext for seeding, your code hashes it
    role: "business",
    isActive: true,
    lastLogin: new Date("2025-07-29T08:15:00Z"),
    detectionsCount: 134,
  },
];

export { dummyUsers };
