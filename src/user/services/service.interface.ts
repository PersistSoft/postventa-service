export default interface Service {
  findAll();
  findById(id: number);
  deletById(id: number);
}
