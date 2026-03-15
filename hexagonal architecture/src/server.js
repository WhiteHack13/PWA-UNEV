import { config } from "./config.js";
import { createApp } from "./app.js";

import { usuariosRepo } from "./infrastructure/repositories/usuariosRepo.js";
import { sesionesRepo } from "./infrastructure/repositories/sesionesRepo.js";
import { tokensRepo } from "./infrastructure/repositories/tokensRepo.js";
import { oauthRepo } from "./infrastructure/repositories/oauthRepo.js";
import { categoriasRepo } from "./infrastructure/repositories/categoriasRepo.js";
import { preguntasRepo } from "./infrastructure/repositories/preguntasRepo.js";
import { intentosRepo } from "./infrastructure/repositories/intentosRepo.js";
import { respuestasRepo } from "./infrastructure/repositories/respuestasRepo.js";

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
};

const app = createApp({ repos });

app.listen(config.port, () => {
  console.log(`API running on port ${config.port}`);
});