# 💸 FlowCash

**FlowCash** es una aplicación móvil desarrollada durante el cuatrimestre con el objetivo de ayudar al usuario a registrar y controlar sus gastos, agregarlos por categorías, analizar reportes mensuales y recibir sugerencias de ahorro.

---

## 🎯 Objetivo General

Desarrollar una aplicación móvil intuitiva y fácil de usar que permita a los usuarios registrar, organizar y analizar sus gastos personales de manera eficiente. La app proporcionará herramientas para gestionar presupuestos, visualizar estadísticas y mejorar el control financiero.

---

## 📱 Descripción de la App

**FlowCash** es una herramienta digital diseñada para facilitar el control de las finanzas personales. Permite:

- Registrar gastos en diferentes categorías.
- Visualizar reportes detallados.
- Establecer presupuestos mensuales.

Con una interfaz sencilla e intuitiva, ofrece funciones como historial de transacciones, filtrado por categorías y generación de reportes financieros.

---

## ⚙️ Funciones Principales

- Registro de gastos con monto, categoría y fecha.
- Visualización detallada de gastos.
- Establecimiento de presupuesto mensual.
- Interfaz minimalista y fácil de navegar.

Ideal para estudiantes, profesionales o cualquier persona interesada en mejorar su educación financiera y optimizar sus hábitos de gasto.

---

## 🧱 Tipo de Arquitectura

Se empleó una arquitectura modular basada en navegación utilizando **React Navigation**, lo que facilita la creación de una interfaz simple y organizada para el usuario.

---

## 🧰 Framework Seleccionado

El framework elegido es **React Native**, por su facilidad de uso y similitud con herramientas como **Bootstrap**, permitiendo el desarrollo de componentes dinámicos y una interfaz más amigable e intuitiva para el usuario final.

---

## 📊 Diagrama de Flujo de la Aplicación

```mermaid
flowchart TD
  st([🏠 Inicio])
  add_expense[➕ Agregar Gasto]
  save_expense[💾 Guardar Gasto]
  history[📋 Historial de Gastos]
  reports[📊 Reportes]
  settings[⚙️ Configuración]
  back_home([🏠 Volver a Inicio])

  st --> add_expense
  st --> history
  st --> reports
  st --> settings
  add_expense --> save_expense --> back_home
  history --> back_home
  reports --> back_home
  settings --> back_home
