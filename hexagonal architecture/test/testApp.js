import { createApp } from "../src/app.js"

import { config } from "../src/config.js"

import { usuariosRepo } from "../src/infrastructure/repositories/usuariosRepo.js"
import { sesionesRepo } from "../src/infrastructure/repositories/sesionesRepo.js"
import { tokensRepo } from "../src/infrastructure/repositories/tokensRepo.js"
import { oauthRepo } from "../src/infrastructure/repositories/oauthRepo.js"
import { categoriasRepo } from "../src/infrastructure/repositories/categoriasRepo.js"
import { preguntasRepo } from "../src/infrastructure/repositories/preguntasRepo.js"
import { intentosRepo } from "../src/infrastructure/repositories/intentosRepo.js"
import { respuestasRepo } from "../src/infrastructure/repositories/respuestasRepo.js"

const repos = {
    config,
    usuariosRepo,
    sesionesRepo,
    tokensRepo,
    oauthRepo,
    categoriasRepo,
    preguntasRepo,
    intentosRepo,
    respuestasRepo
}

export const app = createApp({ repos })