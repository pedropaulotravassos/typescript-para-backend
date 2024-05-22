import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  dataDeNascimento: Date;

  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;

  @Column()
  adotado: boolean;

  constructor(
    nome: string,
    especie: EnumEspecie,
    dataDeNascimento: Date,
    adotado: boolean
  ) {
    this.nome = nome;
    this.especie = especie;
    this.dataDeNascimento = dataDeNascimento;
    this.adotado = adotado;
  }
}
