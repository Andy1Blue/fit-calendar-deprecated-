import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class DataEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 11 })
    trainingDate: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'int', length: 11, nullable: true  })
    distance: number | null;

    @Column({ type: 'int', length: 11, nullable: true  })
    calories: number | null;

    @Column({ type: 'int', length: 11, nullable: true  })
    time: number | null;

    @Column({ type: 'int', length: 11 })
    userId: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdatedDateTime: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
}
