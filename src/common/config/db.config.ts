import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getDbConfig = (dirname: string): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        host: '0.0.0.0',
        username: 'postgres',
        password: '1234',
        database: 'postgres',
        port: 5432,
        entities: [dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: false,
    }
}

export const getDbTestingConfig = (dirname: string): TypeOrmModuleOptions => {
    return {
        type: 'sqlite', // using sqlite as database
        database: ':memory:', // in-memory database
        entities: [dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    }
}
