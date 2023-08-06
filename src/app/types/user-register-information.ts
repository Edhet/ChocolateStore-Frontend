import Gender from "./gender";

export default interface UserRegisterInformation {
  firstName: string,
  surname: string,
  email: string,
  password: string | null,
  birthDate: string,
  gender: Gender
}
