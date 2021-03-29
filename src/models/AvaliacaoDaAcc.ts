import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Acc from './Acc';
import Usuario from './Usuario';

@Entity('avaliacao_da_acc')
export default class AvaliacaoDaAcc {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public descricao: string;

  @Column({ type: 'timestamp' })
  public criado_em: Date;

  @OneToOne(() => Acc, acc => acc.id)
  @JoinColumn({ name: 'id_acc' })
  public acc: Acc;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  public usuario: Usuario;
}