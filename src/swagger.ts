import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
    .setTitle(' My EE Commerce API')
    .setDescription("The EE Commerce API Description")
    .setVersion('1.0.0')
    .addTag("CRUD-Operation")
    .addTag("User-Login")
    .addTag("Registration")
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}