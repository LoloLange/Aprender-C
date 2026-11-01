import type { TestCase } from '../types';

export interface ProjectExercise {
  id: string;
  title: string;
  instruction: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  theory: string;
  exercises: ProjectExercise[];
}

export const projects: Project[] = [
  // ─── PRINCIPIANTE ─────────────────────────────────────────
  {
    id: 'calculadora-basica',
    title: 'Calculadora básica',
    description: 'Calculadora que realiza las 4 operaciones aritméticas básicas.',
    icon: 'Calculator',
    difficulty: 'Principiante',
    theory: `
<h2>Proyecto: Calculadora básica</h2>
<p>En este proyecto vas a construir una calculadora paso a paso que realice las 4 operaciones básicas: suma, resta, multiplicación y división.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Variables y tipos de datos</strong>: <code>int</code>, <code>float</code>, <code>char</code></li>
  <li><strong>printf / scanf</strong>: entrada y salida formateada</li>
  <li><strong>Condicionales</strong>: <code>if / else if / else</code> o <code>switch</code></li>
  <li><strong>Funciones</strong>: una función por operación</li>
</ul>

<h3>Estructura del programa</h3>
<p>El programa recibe dos números y un operador por entrada estándar y muestra el resultado. Debés manejar la división por cero como caso especial.</p>

<pre><code>Ingrese operación: 10 + 5
Resultado: 15.00</code></pre>

<h3>Pasos sugeridos</h3>
<ol>
  <li>Implementá la función <code>sumar</code></li>
  <li>Agregá las funciones <code>restar</code>, <code>multiplicar</code> y <code>dividir</code></li>
  <li>Armá el programa principal con <code>switch</code></li>
</ol>
`,
    exercises: [
      {
        id: 'calc-1',
        title: 'Función sumar',
        instruction: 'Implementá la función sumar que reciba dos float y devuelva su suma. El programa debe imprimir el resultado con 2 decimales.',
        starterCode: `#include <stdio.h>

// Implementá la función sumar
float sumar(float a, float b) {
    // Tu código acá
}

int main() {
    float a, b;
    scanf("%f %f", &a, &b);
    printf("%.2f\\n", sumar(a, b));
    return 0;
}`,
        solution: `#include <stdio.h>

float sumar(float a, float b) {
    return a + b;
}

int main() {
    float a, b;
    scanf("%f %f", &a, &b);
    printf("%.2f\\n", sumar(a, b));
    return 0;
}`,
        testCases: [
          { input: '10 5', expectedOutput: '15.00', description: 'Suma de 10 + 5' },
          { input: '0 0', expectedOutput: '0.00', description: 'Suma de 0 + 0' },
          { input: '-3 7', expectedOutput: '4.00', description: 'Suma con negativo' },
        ],
        hints: [
          'La función debe retornar a + b',
          'Usá return para devolver el resultado',
        ],
      },
      {
        id: 'calc-2',
        title: 'Las 4 operaciones',
        instruction: 'Implementá las 4 funciones (sumar, restar, multiplicar, dividir) y usá un switch en main para elegir la operación según el char operador. Si es división por cero, imprimí "Error: division por cero".',
        starterCode: `#include <stdio.h>

float sumar(float a, float b) { return a + b; }
float restar(float a, float b) { return a - b; }
float multiplicar(float a, float b) { return a * b; }

// Implementá dividir: si b es 0, retorná 0 (el main maneja el mensaje)
float dividir(float a, float b) {
    // Tu código acá
}

int main() {
    float a, b;
    char op;
    scanf("%f %c %f", &a, &op, &b);

    switch (op) {
        case '+': printf("%.2f\\n", sumar(a, b)); break;
        case '-': printf("%.2f\\n", restar(a, b)); break;
        case '*': printf("%.2f\\n", multiplicar(a, b)); break;
        case '/':
            if (b == 0) {
                printf("Error: division por cero\\n");
            } else {
                printf("%.2f\\n", dividir(a, b));
            }
            break;
        default:
            printf("Operador no valido\\n");
    }
    return 0;
}`,
        solution: `#include <stdio.h>

float sumar(float a, float b) { return a + b; }
float restar(float a, float b) { return a - b; }
float multiplicar(float a, float b) { return a * b; }

float dividir(float a, float b) {
    if (b == 0) return 0;
    return a / b;
}

int main() {
    float a, b;
    char op;
    scanf("%f %c %f", &a, &op, &b);

    switch (op) {
        case '+': printf("%.2f\\n", sumar(a, b)); break;
        case '-': printf("%.2f\\n", restar(a, b)); break;
        case '*': printf("%.2f\\n", multiplicar(a, b)); break;
        case '/':
            if (b == 0) {
                printf("Error: division por cero\\n");
            } else {
                printf("%.2f\\n", dividir(a, b));
            }
            break;
        default:
            printf("Operador no valido\\n");
    }
    return 0;
}`,
        testCases: [
          { input: '10 + 5', expectedOutput: '15.00', description: 'Suma' },
          { input: '10 - 3', expectedOutput: '7.00', description: 'Resta' },
          { input: '4 * 3', expectedOutput: '12.00', description: 'Multiplicación' },
          { input: '10 / 4', expectedOutput: '2.50', description: 'División' },
          { input: '10 / 0', expectedOutput: 'Error: division por cero', description: 'División por cero' },
        ],
        hints: [
          'La función dividir debe verificar si b es 0 antes de dividir',
          'Usá if (b == 0) return 0; al inicio de dividir',
          'El main ya maneja el mensaje de error, la función solo necesita retornar un valor seguro',
        ],
      },
    ],
  },
  {
    id: 'conversor-temperaturas',
    title: 'Conversor de temperaturas',
    description: 'Convierte entre Celsius, Fahrenheit y Kelvin.',
    icon: 'Thermometer',
    difficulty: 'Principiante',
    theory: `
<h2>Proyecto: Conversor de temperaturas</h2>
<p>Vas a crear un programa que convierta temperaturas entre Celsius, Fahrenheit y Kelvin usando funciones.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Funciones</strong>: una función por conversión</li>
  <li><strong>Tipos float</strong>: precisión decimal</li>
  <li><strong>Condicionales</strong>: elegir la conversión</li>
</ul>

<h3>Fórmulas</h3>
<ul>
  <li>C → F: <code>F = C * 9/5 + 32</code></li>
  <li>F → C: <code>C = (F - 32) * 5/9</code></li>
  <li>C → K: <code>K = C + 273.15</code></li>
</ul>
`,
    exercises: [
      {
        id: 'temp-1',
        title: 'Celsius a Fahrenheit',
        instruction: 'Implementá la función celsiusAFahrenheit que convierta de Celsius a Fahrenheit. Imprimí el resultado con 2 decimales.',
        starterCode: `#include <stdio.h>

float celsiusAFahrenheit(float celsius) {
    // Tu código acá
}

int main() {
    float c;
    scanf("%f", &c);
    printf("%.2f\\n", celsiusAFahrenheit(c));
    return 0;
}`,
        solution: `#include <stdio.h>

float celsiusAFahrenheit(float celsius) {
    return celsius * 9.0 / 5.0 + 32.0;
}

int main() {
    float c;
    scanf("%f", &c);
    printf("%.2f\\n", celsiusAFahrenheit(c));
    return 0;
}`,
        testCases: [
          { input: '0', expectedOutput: '32.00', description: '0°C = 32°F' },
          { input: '100', expectedOutput: '212.00', description: '100°C = 212°F' },
          { input: '-40', expectedOutput: '-40.00', description: '-40°C = -40°F' },
        ],
        hints: [
          'La fórmula es: F = C * 9/5 + 32',
          'Usá 9.0/5.0 para que la división sea decimal',
        ],
      },
      {
        id: 'temp-2',
        title: 'Conversor completo',
        instruction: 'Implementá las 3 funciones de conversión. El programa recibe un número y una letra (C, F o K) y convierte a las otras dos unidades.',
        starterCode: `#include <stdio.h>

float celsiusAFahrenheit(float c) { return c * 9.0 / 5.0 + 32.0; }
float celsiusAKelvin(float c) { return c + 273.15; }

// Implementá fahrenheitACelsius
float fahrenheitACelsius(float f) {
    // Tu código acá
}

int main() {
    float temp;
    char unidad;
    scanf("%f %c", &temp, &unidad);

    if (unidad == 'C') {
        printf("%.2f F\\n", celsiusAFahrenheit(temp));
        printf("%.2f K\\n", celsiusAKelvin(temp));
    } else if (unidad == 'F') {
        float c = fahrenheitACelsius(temp);
        printf("%.2f C\\n", c);
        printf("%.2f K\\n", celsiusAKelvin(c));
    }
    return 0;
}`,
        solution: `#include <stdio.h>

float celsiusAFahrenheit(float c) { return c * 9.0 / 5.0 + 32.0; }
float celsiusAKelvin(float c) { return c + 273.15; }

float fahrenheitACelsius(float f) {
    return (f - 32.0) * 5.0 / 9.0;
}

int main() {
    float temp;
    char unidad;
    scanf("%f %c", &temp, &unidad);

    if (unidad == 'C') {
        printf("%.2f F\\n", celsiusAFahrenheit(temp));
        printf("%.2f K\\n", celsiusAKelvin(temp));
    } else if (unidad == 'F') {
        float c = fahrenheitACelsius(temp);
        printf("%.2f C\\n", c);
        printf("%.2f K\\n", celsiusAKelvin(c));
    }
    return 0;
}`,
        testCases: [
          { input: '100 C', expectedOutput: '212.00 F\n373.15 K', description: '100°C a F y K' },
          { input: '32 F', expectedOutput: '0.00 C\n273.15 K', description: '32°F a C y K' },
          { input: '212 F', expectedOutput: '100.00 C\n373.15 K', description: '212°F a C y K' },
        ],
        hints: [
          'La fórmula inversa es: C = (F - 32) * 5/9',
          'Usá 5.0/9.0 para que sea división decimal',
        ],
      },
    ],
  },
  {
    id: 'tabla-multiplicar',
    title: 'Tabla de multiplicar',
    description: 'Genera tablas de multiplicar con ciclos y formato.',
    icon: 'Grid',
    difficulty: 'Principiante',
    theory: `
<h2>Proyecto: Tabla de multiplicar</h2>
<p>Vas a crear un programa que genere la tabla de multiplicar de un número dado, usando ciclos <code>for</code>.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Ciclos for</strong>: iteración controlada</li>
  <li><strong>printf con formato</strong>: alineación de columnas</li>
  <li><strong>Funciones</strong>: encapsular la lógica</li>
</ul>

<h3>Ejemplo de salida</h3>
<pre><code>5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50</code></pre>
`,
    exercises: [
      {
        id: 'tabla-1',
        title: 'Tabla simple',
        instruction: 'Escribí un programa que lea un número e imprima su tabla de multiplicar del 1 al 10, con el formato "N x I = R".',
        starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    // Imprimí la tabla del 1 al 10
    // Formato: "N x I = R\\n"

    return 0;
}`,
        solution: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}`,
        testCases: [
          { input: '5', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50', description: 'Tabla del 5' },
          { input: '1', expectedOutput: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10', description: 'Tabla del 1' },
        ],
        hints: [
          'Usá un for desde i = 1 hasta i <= 10',
          'Dentro del for: printf("%d x %d = %d\\n", n, i, n * i)',
        ],
      },
      {
        id: 'tabla-2',
        title: 'Tabla con rango',
        instruction: 'Ahora el programa recibe 3 números: el número base, el inicio y el fin del rango. Imprimí la tabla en ese rango.',
        starterCode: `#include <stdio.h>

void imprimirTabla(int n, int desde, int hasta) {
    // Tu código acá
}

int main() {
    int n, desde, hasta;
    scanf("%d %d %d", &n, &desde, &hasta);
    imprimirTabla(n, desde, hasta);
    return 0;
}`,
        solution: `#include <stdio.h>

void imprimirTabla(int n, int desde, int hasta) {
    for (int i = desde; i <= hasta; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
}

int main() {
    int n, desde, hasta;
    scanf("%d %d %d", &n, &desde, &hasta);
    imprimirTabla(n, desde, hasta);
    return 0;
}`,
        testCases: [
          { input: '3 1 5', expectedOutput: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15', description: 'Tabla del 3 (1 a 5)' },
          { input: '7 5 7', expectedOutput: '7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49', description: 'Tabla del 7 (5 a 7)' },
        ],
        hints: [
          'El for va desde i = desde hasta i <= hasta',
          'La función es void porque solo imprime, no retorna',
        ],
      },
    ],
  },

  // ─── INTERMEDIO ────────────────────────────────────────────
  {
    id: 'gestor-contactos',
    title: 'Gestor de contactos',
    description: 'CRUD de contactos usando structs y arreglos.',
    icon: 'Users',
    difficulty: 'Intermedio',
    theory: `
<h2>Proyecto: Gestor de contactos</h2>
<p>Vas a construir un sistema para guardar, buscar y listar contactos usando <code>struct</code> y arreglos.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Structs</strong>: definir el tipo Contacto</li>
  <li><strong>Arreglos de structs</strong>: almacenar múltiples contactos</li>
  <li><strong>Cadenas</strong>: strcmp, strcpy para manejar nombres</li>
  <li><strong>Funciones</strong>: agregar, buscar, listar</li>
</ul>

<h3>Estructura del contacto</h3>
<pre><code>typedef struct {
    char nombre[50];
    char telefono[20];
    int edad;
} Contacto;</code></pre>
`,
    exercises: [
      {
        id: 'contactos-1',
        title: 'Agregar y listar',
        instruction: 'Completá la función agregarContacto que guarde un contacto en el arreglo. Luego imprimí todos los contactos en formato "Nombre: X, Tel: Y, Edad: Z".',
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nombre[50];
    char telefono[20];
    int edad;
} Contacto;

int total = 0;
Contacto agenda[100];

void agregarContacto(const char *nombre, const char *tel, int edad) {
    // Tu código acá: copiá los datos al arreglo y aumentá total
}

void listar() {
    for (int i = 0; i < total; i++) {
        printf("Nombre: %s, Tel: %s, Edad: %d\\n",
            agenda[i].nombre, agenda[i].telefono, agenda[i].edad);
    }
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        char nom[50], tel[20];
        int edad;
        scanf("%s %s %d", nom, tel, &edad);
        agregarContacto(nom, tel, edad);
    }
    listar();
    return 0;
}`,
        solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nombre[50];
    char telefono[20];
    int edad;
} Contacto;

int total = 0;
Contacto agenda[100];

void agregarContacto(const char *nombre, const char *tel, int edad) {
    strcpy(agenda[total].nombre, nombre);
    strcpy(agenda[total].telefono, tel);
    agenda[total].edad = edad;
    total++;
}

void listar() {
    for (int i = 0; i < total; i++) {
        printf("Nombre: %s, Tel: %s, Edad: %d\\n",
            agenda[i].nombre, agenda[i].telefono, agenda[i].edad);
    }
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        char nom[50], tel[20];
        int edad;
        scanf("%s %s %d", nom, tel, &edad);
        agregarContacto(nom, tel, edad);
    }
    listar();
    return 0;
}`,
        testCases: [
          { input: '2\nJuan 1234 25\nMaria 5678 30', expectedOutput: 'Nombre: Juan, Tel: 1234, Edad: 25\nNombre: Maria, Tel: 5678, Edad: 30', description: 'Agregar 2 contactos' },
          { input: '1\nPedro 9999 18', expectedOutput: 'Nombre: Pedro, Tel: 9999, Edad: 18', description: 'Agregar 1 contacto' },
        ],
        hints: [
          'Usá strcpy para copiar strings al struct',
          'No olvides incrementar total después de agregar',
          'strcpy(agenda[total].nombre, nombre)',
        ],
      },
      {
        id: 'contactos-2',
        title: 'Buscar contacto',
        instruction: 'Agregá la función buscarContacto que reciba un nombre y devuelva el índice en el arreglo (-1 si no existe). El programa agrega N contactos, luego busca uno e imprime sus datos o "No encontrado".',
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nombre[50];
    char telefono[20];
    int edad;
} Contacto;

int total = 0;
Contacto agenda[100];

void agregarContacto(const char *nombre, const char *tel, int edad) {
    strcpy(agenda[total].nombre, nombre);
    strcpy(agenda[total].telefono, tel);
    agenda[total].edad = edad;
    total++;
}

int buscarContacto(const char *nombre) {
    // Tu código acá: recorré el arreglo y compará con strcmp
    // Retorná el índice o -1
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        char nom[50], tel[20];
        int edad;
        scanf("%s %s %d", nom, tel, &edad);
        agregarContacto(nom, tel, edad);
    }
    char buscar[50];
    scanf("%s", buscar);
    int idx = buscarContacto(buscar);
    if (idx >= 0) {
        printf("Nombre: %s, Tel: %s, Edad: %d\\n",
            agenda[idx].nombre, agenda[idx].telefono, agenda[idx].edad);
    } else {
        printf("No encontrado\\n");
    }
    return 0;
}`,
        solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nombre[50];
    char telefono[20];
    int edad;
} Contacto;

int total = 0;
Contacto agenda[100];

void agregarContacto(const char *nombre, const char *tel, int edad) {
    strcpy(agenda[total].nombre, nombre);
    strcpy(agenda[total].telefono, tel);
    agenda[total].edad = edad;
    total++;
}

int buscarContacto(const char *nombre) {
    for (int i = 0; i < total; i++) {
        if (strcmp(agenda[i].nombre, nombre) == 0) return i;
    }
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        char nom[50], tel[20];
        int edad;
        scanf("%s %s %d", nom, tel, &edad);
        agregarContacto(nom, tel, edad);
    }
    char buscar[50];
    scanf("%s", buscar);
    int idx = buscarContacto(buscar);
    if (idx >= 0) {
        printf("Nombre: %s, Tel: %s, Edad: %d\\n",
            agenda[idx].nombre, agenda[idx].telefono, agenda[idx].edad);
    } else {
        printf("No encontrado\\n");
    }
    return 0;
}`,
        testCases: [
          { input: '2\nJuan 1234 25\nMaria 5678 30\nMaria', expectedOutput: 'Nombre: Maria, Tel: 5678, Edad: 30', description: 'Buscar existente' },
          { input: '1\nPedro 9999 18\nLuis', expectedOutput: 'No encontrado', description: 'Buscar no existente' },
        ],
        hints: [
          'Recorré con un for de 0 a total',
          'Usá strcmp(agenda[i].nombre, nombre) == 0 para comparar',
          'Si strcmp devuelve 0, son iguales',
        ],
      },
    ],
  },
  {
    id: 'cifrador-cesar',
    title: 'Cifrado César',
    description: 'Encriptá y desencriptá mensajes con el cifrado clásico.',
    icon: 'Shield',
    difficulty: 'Intermedio',
    theory: `
<h2>Proyecto: Cifrado César</h2>
<p>El cifrado César desplaza cada letra del alfabeto un número fijo de posiciones. Por ejemplo, con desplazamiento 3: A→D, B→E, Z→C.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Cadenas</strong>: recorrer y modificar caracteres</li>
  <li><strong>Aritmética de caracteres</strong>: 'a' + desplazamiento</li>
  <li><strong>Operador módulo</strong>: para que las letras "den la vuelta"</li>
  <li><strong>Punteros</strong>: recorrer la cadena con puntero</li>
</ul>

<h3>Fórmula</h3>
<pre><code>cifrado = (letra - 'a' + desplazamiento) % 26 + 'a'</code></pre>
<p>Solo se cifran letras minúsculas; los demás caracteres quedan igual.</p>
`,
    exercises: [
      {
        id: 'cesar-1',
        title: 'Cifrar mensaje',
        instruction: 'Implementá la función cifrar que reciba un string y un desplazamiento, y modifique el string in-place cifrando solo las letras minúsculas.',
        starterCode: `#include <stdio.h>

void cifrar(char *texto, int desp) {
    // Tu código acá
    // Recorré el string, si es minúscula aplicá el desplazamiento
}

int main() {
    char texto[200];
    int desp;
    scanf("%d ", &desp);
    fgets(texto, 200, stdin);
    // Quitar el \\n final
    for (int i = 0; texto[i]; i++) {
        if (texto[i] == '\\n') { texto[i] = '\\0'; break; }
    }
    cifrar(texto, desp);
    printf("%s\\n", texto);
    return 0;
}`,
        solution: `#include <stdio.h>

void cifrar(char *texto, int desp) {
    for (int i = 0; texto[i] != '\\0'; i++) {
        if (texto[i] >= 'a' && texto[i] <= 'z') {
            texto[i] = (texto[i] - 'a' + desp) % 26 + 'a';
        }
    }
}

int main() {
    char texto[200];
    int desp;
    scanf("%d ", &desp);
    fgets(texto, 200, stdin);
    for (int i = 0; texto[i]; i++) {
        if (texto[i] == '\\n') { texto[i] = '\\0'; break; }
    }
    cifrar(texto, desp);
    printf("%s\\n", texto);
    return 0;
}`,
        testCases: [
          { input: '3\nabc', expectedOutput: 'def', description: 'abc con desp 3 → def' },
          { input: '1\nxyz', expectedOutput: 'yza', description: 'xyz con desp 1 → yza (vuelta)' },
          { input: '5\nhola mundo', expectedOutput: 'mtqf rzsit', description: 'hola mundo con desp 5' },
        ],
        hints: [
          'Verificá si el char está entre \'a\' y \'z\'',
          'Usá la fórmula: (texto[i] - \'a\' + desp) % 26 + \'a\'',
          'El % 26 hace que las letras "den la vuelta" después de la z',
        ],
      },
      {
        id: 'cesar-2',
        title: 'Descifrar mensaje',
        instruction: 'Implementá la función descifrar. Recibí un texto cifrado y el desplazamiento, e imprimí el texto original. Pista: descifrar es cifrar con (26 - desplazamiento).',
        starterCode: `#include <stdio.h>

void cifrar(char *texto, int desp) {
    for (int i = 0; texto[i] != '\\0'; i++) {
        if (texto[i] >= 'a' && texto[i] <= 'z') {
            texto[i] = (texto[i] - 'a' + desp) % 26 + 'a';
        }
    }
}

void descifrar(char *texto, int desp) {
    // Tu código acá: reutilizá cifrar
}

int main() {
    char texto[200];
    int desp;
    scanf("%d ", &desp);
    fgets(texto, 200, stdin);
    for (int i = 0; texto[i]; i++) {
        if (texto[i] == '\\n') { texto[i] = '\\0'; break; }
    }
    descifrar(texto, desp);
    printf("%s\\n", texto);
    return 0;
}`,
        solution: `#include <stdio.h>

void cifrar(char *texto, int desp) {
    for (int i = 0; texto[i] != '\\0'; i++) {
        if (texto[i] >= 'a' && texto[i] <= 'z') {
            texto[i] = (texto[i] - 'a' + desp) % 26 + 'a';
        }
    }
}

void descifrar(char *texto, int desp) {
    cifrar(texto, 26 - desp);
}

int main() {
    char texto[200];
    int desp;
    scanf("%d ", &desp);
    fgets(texto, 200, stdin);
    for (int i = 0; texto[i]; i++) {
        if (texto[i] == '\\n') { texto[i] = '\\0'; break; }
    }
    descifrar(texto, desp);
    printf("%s\\n", texto);
    return 0;
}`,
        testCases: [
          { input: '3\ndef', expectedOutput: 'abc', description: 'def con desp 3 → abc' },
          { input: '1\nyza', expectedOutput: 'xyz', description: 'yza con desp 1 → xyz' },
        ],
        hints: [
          'Descifrar es lo mismo que cifrar con el desplazamiento invertido',
          'El desplazamiento invertido es 26 - desp',
          'Simplemente llamá cifrar(texto, 26 - desp)',
        ],
      },
    ],
  },
  {
    id: 'estadisticas-arreglo',
    title: 'Estadísticas de arreglo',
    description: 'Calculá mínimo, máximo, promedio y ordená un arreglo.',
    icon: 'BarChart',
    difficulty: 'Intermedio',
    theory: `
<h2>Proyecto: Estadísticas de arreglo</h2>
<p>Vas a implementar funciones para analizar arreglos de números: encontrar el mínimo, máximo, promedio y ordenarlos.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Arreglos</strong>: pasar arreglos a funciones</li>
  <li><strong>Punteros</strong>: los arreglos se pasan por referencia</li>
  <li><strong>Algoritmo de ordenamiento</strong>: bubble sort</li>
  <li><strong>Funciones con arreglos</strong>: recorrer y modificar</li>
</ul>
`,
    exercises: [
      {
        id: 'stats-1',
        title: 'Mínimo, máximo y promedio',
        instruction: 'Implementá las funciones minimo, maximo y promedio. El programa lee N números e imprime los 3 resultados.',
        starterCode: `#include <stdio.h>

int minimo(int arr[], int n) {
    // Tu código acá
}

int maximo(int arr[], int n) {
    // Tu código acá
}

float promedio(int arr[], int n) {
    // Tu código acá
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Min: %d\\n", minimo(arr, n));
    printf("Max: %d\\n", maximo(arr, n));
    printf("Prom: %.2f\\n", promedio(arr, n));
    return 0;
}`,
        solution: `#include <stdio.h>

int minimo(int arr[], int n) {
    int m = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] < m) m = arr[i];
    return m;
}

int maximo(int arr[], int n) {
    int m = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > m) m = arr[i];
    return m;
}

float promedio(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i];
    return (float)sum / n;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Min: %d\\n", minimo(arr, n));
    printf("Max: %d\\n", maximo(arr, n));
    printf("Prom: %.2f\\n", promedio(arr, n));
    return 0;
}`,
        testCases: [
          { input: '5\n3 1 4 1 5', expectedOutput: 'Min: 1\nMax: 5\nProm: 2.80', description: '5 números' },
          { input: '3\n10 20 30', expectedOutput: 'Min: 10\nMax: 30\nProm: 20.00', description: '3 números' },
        ],
        hints: [
          'Para mínimo, empezá con m = arr[0] y recorré comparando',
          'Para promedio, sumá todo y dividí por n, casteando a float',
        ],
      },
      {
        id: 'stats-2',
        title: 'Ordenar con Bubble Sort',
        instruction: 'Implementá la función ordenar usando Bubble Sort. Luego imprimí el arreglo ordenado, separando los números con espacios.',
        starterCode: `#include <stdio.h>

void ordenar(int arr[], int n) {
    // Tu código acá: Bubble Sort
    // Recorré comparando pares adyacentes e intercambiando si están desordenados
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    ordenar(arr, n);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
        solution: `#include <stdio.h>

void ordenar(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    ordenar(arr, n);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
        testCases: [
          { input: '5\n5 3 1 4 2', expectedOutput: '1 2 3 4 5', description: 'Ordenar 5 números' },
          { input: '4\n10 -2 7 3', expectedOutput: '-2 3 7 10', description: 'Ordenar con negativo' },
        ],
        hints: [
          'Bubble Sort usa dos for anidados',
          'Compará arr[j] con arr[j+1] y si están desordenados, intercambialos',
          'Usá una variable temporal para el intercambio',
        ],
      },
    ],
  },

  // ─── AVANZADO ──────────────────────────────────────────────
  {
    id: 'lista-enlazada',
    title: 'Lista enlazada',
    description: 'Implementá una lista enlazada simple con memoria dinámica.',
    icon: 'Link',
    difficulty: 'Avanzado',
    theory: `
<h2>Proyecto: Lista enlazada</h2>
<p>Vas a implementar una lista enlazada simple (linked list) usando punteros y memoria dinámica.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Memoria dinámica</strong>: <code>malloc</code> y <code>free</code></li>
  <li><strong>Punteros a structs</strong>: nodos con puntero al siguiente</li>
  <li><strong>Recursión o iteración</strong>: recorrer la lista</li>
</ul>

<h3>Estructura del nodo</h3>
<pre><code>typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;</code></pre>

<p>Operaciones: insertar al inicio, imprimir la lista, contar elementos.</p>
`,
    exercises: [
      {
        id: 'lista-1',
        title: 'Insertar e imprimir',
        instruction: 'Implementá insertarInicio que cree un nuevo nodo y lo ponga al principio de la lista. Luego imprimí todos los valores separados por " -> " y terminando en "NULL".',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;

Nodo *insertarInicio(Nodo *cabeza, int valor) {
    // Tu código acá: crear nodo, asignar dato, apuntar al anterior cabeza
}

void imprimir(Nodo *cabeza) {
    // Tu código acá: recorrer e imprimir "valor -> valor -> NULL\\n"
}

int main() {
    Nodo *lista = NULL;
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        lista = insertarInicio(lista, v);
    }
    imprimir(lista);
    return 0;
}`,
        solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;

Nodo *insertarInicio(Nodo *cabeza, int valor) {
    Nodo *nuevo = (Nodo *)malloc(sizeof(Nodo));
    nuevo->dato = valor;
    nuevo->siguiente = cabeza;
    return nuevo;
}

void imprimir(Nodo *cabeza) {
    Nodo *actual = cabeza;
    while (actual != NULL) {
        printf("%d -> ", actual->dato);
        actual = actual->siguiente;
    }
    printf("NULL\\n");
}

int main() {
    Nodo *lista = NULL;
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        lista = insertarInicio(lista, v);
    }
    imprimir(lista);
    return 0;
}`,
        testCases: [
          { input: '3\n1 2 3', expectedOutput: '3 -> 2 -> 1 -> NULL', description: 'Insertar 1,2,3 al inicio' },
          { input: '1\n42', expectedOutput: '42 -> NULL', description: 'Un solo elemento' },
        ],
        hints: [
          'malloc(sizeof(Nodo)) reserva memoria para un nodo',
          'El nuevo nodo debe apuntar a la cabeza actual: nuevo->siguiente = cabeza',
          'Retorná el nuevo nodo como nueva cabeza',
        ],
      },
      {
        id: 'lista-2',
        title: 'Contar y liberar',
        instruction: 'Implementá contar (retorna cuántos nodos hay) y liberar (libera toda la memoria). El programa inserta N valores, imprime el conteo, y libera.',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;

Nodo *insertarInicio(Nodo *cabeza, int valor) {
    Nodo *nuevo = (Nodo *)malloc(sizeof(Nodo));
    nuevo->dato = valor;
    nuevo->siguiente = cabeza;
    return nuevo;
}

int contar(Nodo *cabeza) {
    // Tu código acá
}

void liberar(Nodo *cabeza) {
    // Tu código acá: liberar cada nodo con free
}

int main() {
    Nodo *lista = NULL;
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        lista = insertarInicio(lista, v);
    }
    printf("Cantidad: %d\\n", contar(lista));
    liberar(lista);
    printf("Liberada\\n");
    return 0;
}`,
        solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;

Nodo *insertarInicio(Nodo *cabeza, int valor) {
    Nodo *nuevo = (Nodo *)malloc(sizeof(Nodo));
    nuevo->dato = valor;
    nuevo->siguiente = cabeza;
    return nuevo;
}

int contar(Nodo *cabeza) {
    int c = 0;
    while (cabeza != NULL) {
        c++;
        cabeza = cabeza->siguiente;
    }
    return c;
}

void liberar(Nodo *cabeza) {
    while (cabeza != NULL) {
        Nodo *tmp = cabeza;
        cabeza = cabeza->siguiente;
        free(tmp);
    }
}

int main() {
    Nodo *lista = NULL;
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        lista = insertarInicio(lista, v);
    }
    printf("Cantidad: %d\\n", contar(lista));
    liberar(lista);
    printf("Liberada\\n");
    return 0;
}`,
        testCases: [
          { input: '4\n10 20 30 40', expectedOutput: 'Cantidad: 4\nLiberada', description: '4 elementos' },
          { input: '0', expectedOutput: 'Cantidad: 0\nLiberada', description: 'Lista vacía' },
        ],
        hints: [
          'Para contar, recorré con while y un contador',
          'Para liberar, guardá el siguiente antes de hacer free',
          'Nodo *tmp = cabeza; cabeza = cabeza->siguiente; free(tmp);',
        ],
      },
    ],
  },
  {
    id: 'lector-csv',
    title: 'Lector de CSV',
    description: 'Leé y procesá datos de un archivo CSV.',
    icon: 'FileText',
    difficulty: 'Avanzado',
    theory: `
<h2>Proyecto: Lector de CSV</h2>
<p>Vas a escribir funciones para parsear líneas en formato CSV (valores separados por comas) y extraer campos.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Manejo de cadenas</strong>: recorrer carácter a carácter</li>
  <li><strong>strtok</strong> o parsing manual: separar por comas</li>
  <li><strong>Arreglos de strings</strong>: almacenar campos</li>
  <li><strong>I/O de archivos</strong>: fgets para leer líneas</li>
</ul>

<h3>Formato CSV</h3>
<pre><code>nombre,edad,ciudad
Juan,25,Buenos Aires
Maria,30,Cordoba</code></pre>
`,
    exercises: [
      {
        id: 'csv-1',
        title: 'Parsear línea CSV',
        instruction: 'Implementá la función contarCampos que cuente cuántos campos separados por coma tiene una línea. Luego imprimí la cantidad.',
        starterCode: `#include <stdio.h>
#include <string.h>

int contarCampos(const char *linea) {
    // Tu código acá: contá las comas + 1
}

int main() {
    char linea[500];
    fgets(linea, 500, stdin);
    for (int i = 0; linea[i]; i++) {
        if (linea[i] == '\\n') { linea[i] = '\\0'; break; }
    }
    printf("%d\\n", contarCampos(linea));
    return 0;
}`,
        solution: `#include <stdio.h>
#include <string.h>

int contarCampos(const char *linea) {
    int campos = 1;
    for (int i = 0; linea[i] != '\\0'; i++) {
        if (linea[i] == ',') campos++;
    }
    return campos;
}

int main() {
    char linea[500];
    fgets(linea, 500, stdin);
    for (int i = 0; linea[i]; i++) {
        if (linea[i] == '\\n') { linea[i] = '\\0'; break; }
    }
    printf("%d\\n", contarCampos(linea));
    return 0;
}`,
        testCases: [
          { input: 'nombre,edad,ciudad', expectedOutput: '3', description: '3 campos' },
          { input: 'a,b,c,d,e', expectedOutput: '5', description: '5 campos' },
          { input: 'solo', expectedOutput: '1', description: '1 campo sin comas' },
        ],
        hints: [
          'El número de campos es comas + 1',
          'Recorré la cadena contando cuántas veces aparece \',\'',
        ],
      },
      {
        id: 'csv-2',
        title: 'Extraer campo específico',
        instruction: 'Implementá extraerCampo que copie el campo N (0-indexed) de una línea CSV al buffer destino. El programa lee una línea y un número de campo.',
        starterCode: `#include <stdio.h>
#include <string.h>

void extraerCampo(const char *linea, int campo, char *destino) {
    // Tu código acá
    // Recorré la línea, contá comas para encontrar el campo
    // Copiá los caracteres del campo al destino
}

int main() {
    char linea[500], resultado[200];
    int campo;
    fgets(linea, 500, stdin);
    for (int i = 0; linea[i]; i++) {
        if (linea[i] == '\\n') { linea[i] = '\\0'; break; }
    }
    scanf("%d", &campo);
    extraerCampo(linea, campo, resultado);
    printf("%s\\n", resultado);
    return 0;
}`,
        solution: `#include <stdio.h>
#include <string.h>

void extraerCampo(const char *linea, int campo, char *destino) {
    int actual = 0;
    int j = 0;
    for (int i = 0; linea[i] != '\\0'; i++) {
        if (linea[i] == ',') {
            actual++;
        } else if (actual == campo) {
            destino[j++] = linea[i];
        }
    }
    destino[j] = '\\0';
}

int main() {
    char linea[500], resultado[200];
    int campo;
    fgets(linea, 500, stdin);
    for (int i = 0; linea[i]; i++) {
        if (linea[i] == '\\n') { linea[i] = '\\0'; break; }
    }
    scanf("%d", &campo);
    extraerCampo(linea, campo, resultado);
    printf("%s\\n", resultado);
    return 0;
}`,
        testCases: [
          { input: 'Juan,25,Buenos Aires\n0', expectedOutput: 'Juan', description: 'Campo 0' },
          { input: 'Juan,25,Buenos Aires\n1', expectedOutput: '25', description: 'Campo 1' },
          { input: 'Juan,25,Buenos Aires\n2', expectedOutput: 'Buenos Aires', description: 'Campo 2' },
        ],
        hints: [
          'Llevá un contador de campo actual, empezando en 0',
          'Cada vez que encontrés una coma, incrementá el contador',
          'Solo copiá caracteres cuando actual == campo',
        ],
      },
    ],
  },
  {
    id: 'arena-memoria',
    title: 'Arena de memoria',
    description: 'Implementá un allocator simple con un buffer estático.',
    icon: 'Cpu',
    difficulty: 'Avanzado',
    theory: `
<h2>Proyecto: Arena de memoria</h2>
<p>Una arena de memoria es un patrón donde reservás un bloque grande de memoria y luego repartís pedazos de ese bloque. Es más simple y rápido que llamar a <code>malloc</code> repetidamente.</p>

<h3>Conceptos que vas a aplicar</h3>
<ul>
  <li><strong>Memoria</strong>: cómo funciona un allocator</li>
  <li><strong>Punteros y casting</strong>: <code>void *</code> y aritmética de punteros</li>
  <li><strong>Operadores a nivel de bits</strong>: alineación de memoria</li>
</ul>

<h3>Idea</h3>
<pre><code>char buffer[1024];  // El bloque grande
int offset = 0;     // Cuánto ya usamos

void *arena_alloc(int size) {
    void *ptr = &buffer[offset];
    offset += size;
    return ptr;
}</code></pre>
`,
    exercises: [
      {
        id: 'arena-1',
        title: 'Arena básica',
        instruction: 'Implementá arena_alloc que devuelva un puntero al siguiente espacio libre del buffer y avance el offset. Si no hay espacio, retorná NULL. El programa pide N enteros, los guarda en la arena y los imprime.',
        starterCode: `#include <stdio.h>
#include <string.h>

#define ARENA_SIZE 1024
char buffer[ARENA_SIZE];
int offset = 0;

void *arena_alloc(int size) {
    // Tu código acá
    // Verificá que hay espacio, retorná puntero y avanzá offset
}

void arena_reset() {
    offset = 0;
}

int main() {
    int n;
    scanf("%d", &n);

    int *numeros = (int *)arena_alloc(n * sizeof(int));
    if (numeros == NULL) {
        printf("Sin espacio\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        scanf("%d", &numeros[i]);
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", numeros[i]);
    }
    printf("\\n");
    printf("Usado: %d bytes\\n", offset);

    arena_reset();
    return 0;
}`,
        solution: `#include <stdio.h>
#include <string.h>

#define ARENA_SIZE 1024
char buffer[ARENA_SIZE];
int offset = 0;

void *arena_alloc(int size) {
    if (offset + size > ARENA_SIZE) return NULL;
    void *ptr = &buffer[offset];
    offset += size;
    return ptr;
}

void arena_reset() {
    offset = 0;
}

int main() {
    int n;
    scanf("%d", &n);

    int *numeros = (int *)arena_alloc(n * sizeof(int));
    if (numeros == NULL) {
        printf("Sin espacio\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        scanf("%d", &numeros[i]);
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", numeros[i]);
    }
    printf("\\n");
    printf("Usado: %d bytes\\n", offset);

    arena_reset();
    return 0;
}`,
        testCases: [
          { input: '3\n10 20 30', expectedOutput: '10 20 30\nUsado: 12 bytes', description: '3 ints = 12 bytes' },
          { input: '1\n42', expectedOutput: '42\nUsado: 4 bytes', description: '1 int = 4 bytes' },
        ],
        hints: [
          'Verificá que offset + size no supere ARENA_SIZE',
          'El puntero que retornás es &buffer[offset]',
          'Después de reservar, sumá size al offset',
        ],
      },
      {
        id: 'arena-2',
        title: 'Múltiples allocaciones',
        instruction: 'Usá la arena para reservar memoria para un arreglo de strings. Lee N palabras, guardalas en la arena y luego imprimilas.',
        starterCode: `#include <stdio.h>
#include <string.h>

#define ARENA_SIZE 4096
char buffer[ARENA_SIZE];
int offset = 0;

void *arena_alloc(int size) {
    if (offset + size > ARENA_SIZE) return NULL;
    void *ptr = &buffer[offset];
    offset += size;
    return ptr;
}

// Implementá arena_strdup: reservá espacio y copiá el string
char *arena_strdup(const char *src) {
    // Tu código acá
}

int main() {
    int n;
    scanf("%d", &n);

    char **palabras = (char **)arena_alloc(n * sizeof(char *));

    for (int i = 0; i < n; i++) {
        char tmp[100];
        scanf("%s", tmp);
        palabras[i] = arena_strdup(tmp);
    }

    for (int i = 0; i < n; i++) {
        printf("%s\\n", palabras[i]);
    }
    printf("Usado: %d bytes\\n", offset);
    return 0;
}`,
        solution: `#include <stdio.h>
#include <string.h>

#define ARENA_SIZE 4096
char buffer[ARENA_SIZE];
int offset = 0;

void *arena_alloc(int size) {
    if (offset + size > ARENA_SIZE) return NULL;
    void *ptr = &buffer[offset];
    offset += size;
    return ptr;
}

char *arena_strdup(const char *src) {
    int len = strlen(src) + 1;
    char *dest = (char *)arena_alloc(len);
    if (dest) strcpy(dest, src);
    return dest;
}

int main() {
    int n;
    scanf("%d", &n);

    char **palabras = (char **)arena_alloc(n * sizeof(char *));

    for (int i = 0; i < n; i++) {
        char tmp[100];
        scanf("%s", tmp);
        palabras[i] = arena_strdup(tmp);
    }

    for (int i = 0; i < n; i++) {
        printf("%s\\n", palabras[i]);
    }
    printf("Usado: %d bytes\\n", offset);
    return 0;
}`,
        testCases: [
          { input: '3\nhola mundo test', expectedOutput: 'hola\nmundo\ntest\nUsado: 40 bytes', description: '3 palabras' },
          { input: '2\nabc xyz', expectedOutput: 'abc\nxyz\nUsado: 24 bytes', description: '2 palabras' },
        ],
        hints: [
          'strlen(src) + 1 para incluir el \\0',
          'Reservá espacio con arena_alloc y copiá con strcpy',
          'Verificá que arena_alloc no retorne NULL',
        ],
      },
    ],
  },
];
