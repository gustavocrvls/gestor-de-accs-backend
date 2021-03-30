import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ACC } from './ACC';
import { User } from './User';

@Entity('acc_assessment')
export class ACCAssessment {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column()
  public description: string;

  @Column({ type: 'timestamp' })
  public created_at: Date;

  @OneToOne(() => ACC, acc => acc.id)
  @JoinColumn({ name: 'acc_id' })
  public acc: ACC;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}