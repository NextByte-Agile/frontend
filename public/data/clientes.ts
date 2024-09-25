export interface Cliente {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  trips: number;
}

const clientes: Cliente[] = [
  {
    id: 1,
    name: "Juan",
    lastname: "Perez",
    dni: "12345678",
    phone: "923456789",
    trips: 5,
  },
  {
    id: 2,
    name: "Pedro",
    lastname: "Gomez",
    dni: "47654321",
    phone: "976543210",
    trips: 3,
  },
  {
    id: 3,
    name: "Maria",
    lastname: "Lopez",
    dni: "45678912",
    phone: "956789123",
    trips: 7,
  },
  {
    id: 4,
    name: "Ana",
    lastname: "Torres",
    dni: "78912345",
    phone: "989123456",
    trips: 2,
  },
  {
    id: 5,
    name: "Jose",
    lastname: "Garcia",
    dni: "42165487",
    phone: "921654879",
    trips: 4,
  },
  {
    id: 6,
    name: "Carlos",
    lastname: "Rodriguez",
    dni: "78765432",
    phone: "987654321",
    trips: 6,
  },
];

export default clientes;
