import { BaseEntity, Column } from 'typeorm'
export class CommonCreatableEntity extends BaseEntity {

    @Column({
        default: () => 'NOW()',
        nullable: false
    })
    createdAt: Date

}

export class CommonUpdatableEntity extends CommonCreatableEntity {
    @Column({
        nullable: true
    })
    updatedAt: Date
}