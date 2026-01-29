# Guía de nomenclatura BEM

## Índice
1. [Qué es BEM y qué problema resuelve](#1-qué-es-bem-y-qué-problema-resuelve)
2. [Objetivo de la nomenclatura](#2-objetivo-de-la-nomenclatura)
3. [La gramática BEM: estructura del nombre](#3-la-gramática-bem-estructura-del-nombre)
4. [Bloques (Block)](#4-bloques-block)
   1. [Cómo nombrar un bloque](#41-cómo-nombrar-un-bloque)
   2. [Bloques reutilizables y bloque-página](#42-bloques-reutilizables-y-bloque-página)
   3. [Bloques anidados](#43-bloques-anidados)
5. [Elementos (Element)](#5-elementos-element)
   1. [Cómo nombrar un elemento](#51-cómo-nombrar-un-elemento)
   2. [Elementos obligatorios vs opcionales](#52-elementos-obligatorios-vs-opcionales)
   3. [Elementos anidados y niveles](#53-elementos-anidados-y-niveles)
   4. [Cuándo NO usar elementos](#54-cuándo-no-usar-elementos)
6. [Modificadores (Modifier)](#6-modificadores-modifier)
   1. [Modificador de bloque](#61-modificador-de-bloque)
   2. [Modificador de elemento](#62-modificador-de-elemento)
   3. [Variantes vs estados](#63-variantes-vs-estados)
   4. [Modificadores booleanos y de valor](#64-modificadores-booleanos-y-de-valor)
7. [Separadores oficiales y convenciones comunes](#7-separadores-oficiales-y-convenciones-comunes)
8. [Reglas de oro para nombres semánticos](#8-reglas-de-oro-para-nombres-semánticos)
9. [Patrones recomendados (recetas)](#9-patrones-recomendados-recetas)
   1. [Componente de botón](#91-componente-de-botón)
   2. [Tarjeta (card) con variantes](#92-tarjeta-card-con-variantes)
   3. [Formulario con mensajes de error](#93-formulario-con-mensajes-de-error)
   4. [Menú / navegación](#94-menú--navegación)
10. [Antipatrones y errores frecuentes](#10-antipatrones-y-errores-frecuentes)
11. [BEM y “estado” (active, disabled, loading)](#11-bem-y-estado-active-disabled-loading)
12. [BEM con responsive y temas](#12-bem-con-responsive-y-temas)
13. [BEM con utilidades (Tailwind) y CSS Modules](#13-bem-con-utilidades-tailwind-y-css-modules)
14. [Checklist final de revisión BEM](#14-checklist-final-de-revisión-bem)
15. [Referencia rápida (cheatsheet)](#15-referencia-rápida-cheatsheet)

---

## 1. Qué es BEM y qué problema resuelve
BEM es una convención de nomenclatura para clases CSS que modela la interfaz como **componentes** (bloques), sus **partes internas** (elementos) y sus **variaciones** (modificadores).

El problema que busca resolver es el **CSS frágil** cuando el proyecto crece:
- Nombres genéricos repetidos (`.title`, `.item`, `.box`)
- Selectores demasiado dependientes del HTML (`#app .sidebar ul li a`)
- Reglas que se pisan por especificidad y cascada
- Cambios de layout que rompen estilos en otras pantallas
- Dificultad para entender “qué afecta qué” en CSS

---

## 2. Objetivo de la nomenclatura
La nomenclatura BEM busca que una clase:
- Sea **autoexplicativa**
- Indique **pertenencia** (a qué componente pertenece)
- Permita **reutilización** sin acoplarse al DOM
- Reduzca la necesidad de selectores largos y “contextuales”
- Facilite colaboración (varias personas tocando el mismo CSS)

---

## 3. La gramática BEM: estructura del nombre
Un nombre BEM completo sigue esta forma:

- **Bloque:** `bloque`
- **Elemento:** `bloque__elemento`
- **Modificador:** `bloque--modificador` o `bloque__elemento--modificador`

**Separadores estándar:**
- `__` separa **bloque** y **elemento**
- `--` separa **base** y **modificador**

Ejemplos:
- `button` (bloque)
- `button__icon` (elemento)
- `button--primary` (modificador del bloque)
- `button__icon--left` (modificador del elemento)

---

## 4. Bloques (Block)
Un **bloque** es un componente independiente y reutilizable: botón, tarjeta, menú, modal, formulario, tabla, etc.

### 4.1 Cómo nombrar un bloque
Reglas prácticas:
- Usar **minúsculas** y **kebab-case**: `user-card`, `main-nav`, `login-form`
- Elegir nombres **semánticos** (por función), no por apariencia:
  - ✅ `alert`, `button`, `user-card`
  - ❌ `blue-box`, `big-thing`, `rounded-div`
- Evitar nombres excesivamente genéricos:
  - ❌ `container`, `box`, `component`, `item`
  - ✅ `sidebar`, `invoice-table`, `search-bar`

### 4.2 Bloques reutilizables y bloque-página
Existen dos tipos comunes:
- **Bloques reutilizables:** componentes que aparecen en múltiples pantallas (`button`, `modal`, `card`).
- **Bloques de layout/página:** estructuras mayores (`dashboard`, `profile-page`, `auth-layout`).

Recomendación:
- Mantener los bloques de layout lo más delgados posible; el valor está en bloques reutilizables.

### 4.3 Bloques anidados
Un bloque puede contener otro bloque sin problema. Ejemplo:
- `user-card` contiene `button`
- `modal` contiene `form`
- `header` contiene `main-nav`

Regla: cada bloque mantiene su identidad:
- ✅ `<div class="user-card"><button class="button">...</button></div>`
- ❌ “mezclar” nombres de bloques en un solo nombre (ver antipatrones)

---

## 5. Elementos (Element)
Un **elemento** es una parte interna del bloque que no tiene sentido por sí sola fuera del bloque.

### 5.1 Cómo nombrar un elemento
Formato:
- `bloque__elemento`

Reglas:
- Un elemento siempre **pertenece** a un bloque.
- El nombre del elemento debe describir su rol dentro del bloque:
  - `card__title`, `card__body`, `card__footer`
  - `form__field`, `form__label`, `form__error`

### 5.2 Elementos obligatorios vs opcionales
- **Obligatorios:** siempre existen en el bloque, o la UI no tiene sentido.
- **Opcionales:** aparecen solo en ciertos casos (ej. `card__badge`, `card__actions`).

BEM soporta ambos: el HTML define si existe o no el elemento.

### 5.3 Elementos anidados y niveles
BEM clásico evita “cadena de elementos” tipo:
- ❌ `block__element__subelement`

En su lugar:
- O bien se crea **otro elemento** con nombre claro:
  - ✅ `menu__icon`, `menu__text` dentro de `menu__item`
- O se convierte en **bloque independiente** si puede reutilizarse:
  - ✅ `icon` como bloque

Regla mental:
- Si una parte se usa en varios componentes, probablemente es un **bloque**, no un elemento.

### 5.4 Cuándo NO usar elementos
No usar elementos cuando:
- La parte es reutilizable por sí sola (mejor bloque)
- La parte necesita variantes complejas y aparece en diferentes contextos
- La parte se comparte entre distintos bloques

Ejemplo:
- Un `badge` suele ser bloque: `badge badge--warning`
- En vez de `card__badge`, `table__badge`, `modal__badge` repetidos

---

## 6. Modificadores (Modifier)
Un modificador representa una variación del bloque o elemento: estado, tamaño, tema, jerarquía, densidad, etc.

### 6.1 Modificador de bloque
Formato:
- `bloque--modificador`

Ejemplos:
- `button--primary`
- `card--compact`
- `modal--fullscreen`
- `alert--warning`

Uso típico:
- Variantes “de producto” (primary/secondary)
- Tamaños (sm/md/lg)
- Densidad (compact/spacious)
- Comportamiento (collapsible/sticky)

### 6.2 Modificador de elemento
Formato:
- `bloque__elemento--modificador`

Ejemplos:
- `menu__item--active`
- `button__icon--left`
- `table__cell--numeric`
- `form__field--invalid`

Uso típico:
- Estado de un item específico dentro del bloque
- Alineación o rol de una parte interna

### 6.3 Variantes vs estados
Conviene distinguir mentalmente:
- **Variante:** identidad de diseño (`button--primary`, `card--compact`)
- **Estado:** condición temporal (`menu__item--active`, `button--loading`)

En BEM ambos usan `--`, pero esta separación mejora consistencia.

### 6.4 Modificadores booleanos y de valor
**Booleanos** (presencia/ausencia):
- `button--disabled`
- `modal--open`
- `table__row--selected`

**De valor** (varios valores posibles):
- `button--size-sm`, `button--size-md`, `button--size-lg`
- `grid--cols-2`, `grid--cols-3`
- `text--align-left`, `text--align-center`

Recomendación:
- Para valores, usar prefijos (`size-`, `cols-`, `align-`) para evitar ambigüedad.

---

## 7. Separadores oficiales y convenciones comunes
Lo más común:
- `block__element--modifier` con `kebab-case`

Convenciones recomendadas:
- `kebab-case` para todo: `user-card__action--danger`
- Evitar camelCase: `userCard__action--danger` (menos estándar en CSS)

---

## 8. Reglas de oro para nombres semánticos
1. Nombrar por **intención**, no por color o forma  
   - ✅ `--danger`, `--success`  
   - ❌ `--red`, `--green`
2. Evitar palabras vacías  
   - ❌ `thing`, `box`, `wrapper`, `container`  
   - ✅ `sidebar`, `toolbar`, `filters`
3. Mantener consistencia en todo el sistema  
   - Si existe `--compact`, usarlo en varios bloques para densidad.
4. Un bloque debe describir un **componente**, no un lugar del DOM  
   - ✅ `main-nav` (componente)  
   - ⚠️ `left-column` (depende del layout)
5. Un modificador debe ser una variación real y estable  
   - Si se usa una vez y nunca más, suele ser señal de mala abstracción.

---

## 9. Patrones recomendados (recetas)

### 9.1 Componente de botón
- Bloque: `button`
- Elementos: `button__icon`, `button__text`
- Modificadores: `button--primary`, `button--ghost`, `button--loading`, `button--size-sm`

Ejemplo de clases:
- `button button--primary button--size-sm`
- `button__icon button__icon--left`

### 9.2 Tarjeta (card) con variantes
- `card` (bloque)
- `card__header`, `card__title`, `card__body`, `card__footer`
- `card--compact`, `card--highlighted`

### 9.3 Formulario con mensajes de error
- `form` (bloque)
- `form__field`, `form__label`, `form__input`, `form__error`
- `form__field--invalid`, `form__input--disabled`

### 9.4 Menú / navegación
- `menu` (bloque)
- `menu__item`, `menu__link`, `menu__icon`, `menu__text`
- `menu__item--active`

---

## 10. Antipatrones y errores frecuentes
1. **Encadenar elementos**
   - ❌ `card__header__title`
   - ✅ `card__title` (aunque esté en el header)
2. **Mezclar bloques en un mismo nombre**
   - ❌ `sidebar__menu__item` si `menu` es bloque propio
   - ✅ `sidebar` contiene `menu`, y `menu__item`
3. **Modificadores por color puro**
   - ❌ `alert--red`
   - ✅ `alert--error`
4. **Bloques genéricos**
   - ❌ `box`, `component`
   - ✅ nombres por función
5. **CSS dependiente del DOM**
   - ❌ `.sidebar ul li a`
   - ✅ `.menu__link`

---

## 11. BEM y “estado” (active, disabled, loading)
Estados típicos se modelan como modificadores:
- `menu__item--active`
- `button--disabled`
- `button--loading`
- `modal--open`
- `form__field--invalid`

Regla:
- El estado se expresa en la clase, no en selectores complejos.

---

## 12. BEM con responsive y temas
En BEM, lo responsive y temas se suelen modelar como:
- Modificadores de bloque: `card--compact`, `grid--cols-3`
- O bien clases utilitarias aparte (si se usa Tailwind, por ejemplo)

Recomendación:
- Si un patrón responsive es parte del componente, usar modificador (ej. `navbar--collapsed`)
- Si es layout/página, manejarlo en el bloque de layout (`dashboard--dense`)

---

## 13. BEM con utilidades (Tailwind) y CSS Modules

### Con Tailwind
Dos enfoques comunes:
- BEM para estructura + Tailwind para ajustes menores
- Tailwind para todo + BEM solo donde se necesita semántica fuerte

Regla práctica:
- Mantener BEM para componentes reutilizables y estados semánticos.

### Con CSS Modules
Aunque el nombre se encapsule, BEM sigue útil como convención:
- `userCard`, `userCard__title`, `userCard--compact`
o manteniendo strings BEM si se prefiere consistencia visual.

---

## 14. Checklist final de revisión BEM
- [ ] ¿Cada bloque es un componente independiente?
- [ ] ¿Los elementos existen solo dentro de su bloque?
- [ ] ¿Los modificadores representan variantes/estados reales?
- [ ] ¿Los nombres son semánticos, no visuales?
- [ ] ¿Se evitó CSS dependiente del DOM?
- [ ] ¿No hay encadenamiento de elementos tipo `__a__b`?
- [ ] ¿Las variantes y estados se expresan con `--`?
- [ ] ¿Se evita duplicación de estilos entre “componentes” similares?

---

## 15. Referencia rápida (cheatsheet)
- **Bloque:** `block`
- **Elemento:** `block__element`
- **Modificador bloque:** `block--modifier`
- **Modificador elemento:** `block__element--modifier`

Ejemplos:
- `button`
- `button__icon`
- `button--primary`
- `menu__item--active`
- `card--compact`
- `form__field--invalid`
