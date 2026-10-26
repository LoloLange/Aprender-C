import type { Module } from '../types';

export const modules: Module[] = [
  {
    id: 'fundamentos',
    title: 'Primeros pasos en C',
    description: 'Tu primer programa, compilación, bloques, sentencias y comentarios.',
    icon: 'Rocket',
    difficulty: 'Principiante',
    prerequisites: [],
    lessons: [
      {
        id: 'hola-mundo',
        title: 'Hola mundo',
        description: 'Tu primer programa en C',
        content: {
          theory: `
<h2>Tu primer programa en C</h2>
<h3>Objetivos</h3>
<ul>
<li>Entender la estructura básica de un programa en C</li>
<li>Conocer la función <code>main</code></li>
<li>Usar <code>printf</code> para imprimir en pantalla</li>
<li>Compilar y ejecutar un programa</li>
</ul>

<h3>C es un lenguaje compilado</h3>
<p>A diferencia de Python, que es <strong>interpretado</strong> (un intérprete ejecuta tu código línea por línea), C es un lenguaje <strong>compilado</strong>: primero un <em>compilador</em> traduce tu código fuente a código de máquina (un archivo ejecutable), y luego ejecutás ese archivo.</p>

<pre><code class="language-c">// archivo: hola.c
#include &lt;stdio.h&gt;

int main(void) {
    printf("Hola mundo\\n");
    return 0;
}</code></pre>

<p>Desglosemos este programa:</p>
<ul>
<li><code>#include &lt;stdio.h&gt;</code> — Incluye la biblioteca estándar de entrada/salida. Ahí está definida la función <code>printf</code>.</li>
<li><code>int main(void)</code> — La función principal. Todo programa C empieza ejecutando <code>main</code>. Devuelve un <code>int</code>: <strong>0</strong> significa que todo salió bien, cualquier otro número indica un error.</li>
<li><code>printf("Hola mundo\\n")</code> — Imprime texto en la consola. El <code>\\n</code> es un <em>caracter de escape</em> que produce un salto de línea. Otros caracteres de escape útiles son <code>\\t</code> (tabulación) y <code>\\\\</code> (para imprimir una barra invertida).</li>
<li><code>return 0;</code> — Indica que el programa terminó correctamente.</li>
</ul>

<h3>printf y especificadores de formato</h3>
<p><code>printf</code> no solo imprime texto fijo: también puede imprimir valores de variables usando <strong>especificadores de formato</strong>, que empiezan con <code>%</code>:</p>
<pre><code class="language-c">int edad = 20;
printf("Tengo %d años\\n", edad);  // %d para enteros (int)

float altura = 1.75;
printf("Mido %.2f metros\\n", altura);  // %f para float/double, .2 indica 2 decimales

char inicial = 'L';
printf("Mi inicial es %c\\n", inicial);  // %c para un caracter</code></pre>

<p>Los especificadores más comunes:</p>
<table>
<tr><th>Especificador</th><th>Tipo</th><th>Ejemplo</th></tr>
<tr><td><code>%d</code></td><td><code>int</code></td><td><code>printf("%d", 42)</code> → 42</td></tr>
<tr><td><code>%f</code></td><td><code>float</code> / <code>double</code></td><td><code>printf("%.2f", 3.14)</code> → 3.14</td></tr>
<tr><td><code>%c</code></td><td><code>char</code> (un caracter)</td><td><code>printf("%c", 'A')</code> → A</td></tr>
<tr><td><code>%s</code></td><td>cadena de caracteres</td><td><code>printf("%s", "hola")</code> → hola</td></tr>
<tr><td><code>%zu</code></td><td><code>size_t</code> (sizeof)</td><td><code>printf("%zu", sizeof(int))</code></td></tr>
<tr><td><code>%p</code></td><td>puntero (dirección)</td><td><code>printf("%p", &x)</code></td></tr>
<tr><td><code>%ld</code></td><td><code>long</code></td><td><code>printf("%ld", 1000000L)</code></td></tr>
</table>
<p>Si usás el especificador incorrecto (por ejemplo <code>%d</code> para un <code>float</code>), el valor impreso va a ser basura. El compilador suele avisar con un warning.</p>

<h3>Compilación</h3>
<p>Para compilar con GCC:</p>
<pre><code class="language-bash">$ gcc -o hola hola.c -Wall -std=c23
$ ./hola
Hola mundo</code></pre>
<p>El flag <code>-Wall</code> activa todas las advertencias, y <code>-std=c23</code> indica el estándar de C a usar.</p>

<h3>Bloques y sentencias</h3>
<p>En C, el código se organiza en:</p>
<ul>
<li><strong>Sentencias</strong>: instrucciones que terminan con <code>;</code></li>
<li><strong>Bloques</strong>: conjuntos de sentencias encerrados entre <code>{ }</code></li>
</ul>
<p>Las sentencias solo pueden aparecer dentro de alguna función.</p>

<h3>Comentarios</h3>
<pre><code class="language-c">// Esto es un comentario de una línea

/*
  Esto es un comentario
  de varias líneas
*/</code></pre>

<div class="tip">
<strong>Recordá:</strong> C es un lenguaje con <strong>tipado estático</strong> (las variables tienen un tipo fijo) y la <strong>memoria es administrada por el programador</strong> (no hay recolector de basura como en Python).
</div>

<h3>Resumen</h3>
<ul>
<li>Todo programa C necesita una función <code>main</code></li>
<li><code>#include</code> permite usar bibliotecas como <code>stdio.h</code></li>
<li><code>printf</code> imprime texto en la consola</li>
<li>Las sentencias terminan con <code>;</code></li>
<li>C es compilado, tipado estático y sin recolector de basura</li>
</ul>`,
          exercises: [
            {
              id: 'hola-mundo-1',
              title: 'Hola mundo básico',
              instruction: 'Escribí un programa que imprima "Hola mundo" seguido de un salto de línea.',
              type: 'write',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

int main(void) {
    // Tu código acá

    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    printf("Hola mundo\\n");
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Hola mundo\n', description: 'Debe imprimir "Hola mundo"' }
              ],
              hints: [
                'Usá la función printf para imprimir texto.',
                'El formato es: printf("texto\\n");',
                'Recordá incluir \\n al final para el salto de línea.'
              ]
            },
            {
              id: 'hola-mundo-2',
              title: 'Múltiples líneas',
              instruction: 'Escribí un programa que imprima tu nombre en la primera línea y "Estoy aprendiendo C" en la segunda línea.',
              type: 'write',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

int main(void) {
    // Imprimí tu nombre en una línea

    // Imprimí "Estoy aprendiendo C" en otra línea

    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    printf("Lolo\\n");
    printf("Estoy aprendiendo C\\n");
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '', description: 'Debe imprimir dos líneas: un nombre y "Estoy aprendiendo C"' }
              ],
              hints: [
                'Podés usar varios printf, uno para cada línea.',
                'Cada printf debe terminar con \\n para el salto de línea.',
              ]
            },
            {
              id: 'hola-mundo-3',
              title: 'Corregir el programa',
              instruction: 'El siguiente programa tiene errores de sintaxis. Corregilo para que compile y muestre "Bienvenido a C".',
              type: 'fix-syntax',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

int main(void) {
    printf("Bienvenido a C\\n")
    return 0
}`,
              solution: `#include <stdio.h>

int main(void) {
    printf("Bienvenido a C\\n");
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Bienvenido a C\n', description: 'Debe imprimir "Bienvenido a C"' }
              ],
              hints: [
                'Revisá que todas las sentencias terminen con punto y coma (;).',
                'Hay dos sentencias a las que les falta el punto y coma.',
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'tipos',
    title: 'Variables y tipos de datos',
    description: 'Tipos básicos, sizeof, signed/unsigned, literales, constantes, typedef y enumerativos.',
    icon: 'Database',
    difficulty: 'Principiante',
    prerequisites: ['fundamentos'],
    lessons: [
      {
        id: 'variables-basicas',
        title: 'Declaraciones y tipos básicos',
        description: 'Variables, tipos enteros y de punto flotante',
        content: {
          theory: `
<h2>Variables y tipos básicos</h2>
<h3>Objetivos</h3>
<ul>
<li>Declarar y definir variables</li>
<li>Conocer los tipos enteros: <code>char</code>, <code>short</code>, <code>int</code>, <code>long</code></li>
<li>Conocer los tipos de punto flotante: <code>float</code>, <code>double</code></li>
<li>Entender <code>sizeof</code></li>
</ul>

<h3>Declaración y definición</h3>
<p>En C, antes de usar una variable hay que <strong>declararla</strong> (indicar su tipo y nombre):</p>
<pre><code class="language-c">int a;       // declaración: reserva espacio en memoria
a = 6;       // definición: le asigna un valor</code></pre>
<p>También se puede declarar y definir en una sola línea:</p>
<pre><code class="language-c">float b = 8.5;  // declaración + definición</code></pre>

<div class="warning">
<strong>⚠️ Importante:</strong> Una variable declarada pero no definida contiene <strong>basura</strong> (un valor indeterminado que estaba en esa posición de memoria).
</div>

<h3>Tipos enteros</h3>
<table>
<tr><th>Tipo</th><th>Ejemplo</th><th>Uso típico</th><th>printf</th></tr>
<tr><td><code>char</code></td><td><code>char cant_barrios = 48;</code></td><td>Valores pequeños, caracteres</td><td><code>%c</code> o <code>%d</code></td></tr>
<tr><td><code>short</code></td><td><code>short p_san_telmo = 25969;</code></td><td>Enteros pequeños</td><td><code>%d</code></td></tr>
<tr><td><code>int</code></td><td><code>int p_argentina = 43847430;</code></td><td>Enteros generales</td><td><code>%d</code></td></tr>
<tr><td><code>long</code></td><td><code>long p_tierra = 7683320684;</code></td><td>Enteros grandes</td><td><code>%ld</code></td></tr>
</table>

<h3>El tipo char</h3>
<p>El tipo <code>char</code> almacena un solo caracter y ocupa exactamente 1 byte. Los valores <code>char</code> se escriben entre <strong>comillas simples</strong>:</p>
<pre><code class="language-c">char letra = 'A';       // comillas simples: UN solo caracter
char digito = '7';      // el caracter '7', no el número 7
char salto = '\\n';     // caracter de escape (salto de línea)</code></pre>
<p>Internamente, cada <code>char</code> es un número entero (su código ASCII). Por eso <code>'A'</code> vale 65, <code>'a'</code> vale 97, y <code>'0'</code> vale 48. Podés imprimirlo como caracter con <code>%c</code> o como número con <code>%d</code>:</p>
<pre><code class="language-c">char c = 'A';
printf("%c\\n", c);  // imprime: A
printf("%d\\n", c);  // imprime: 65</code></pre>

<h3>Tipos de punto flotante</h3>
<p>Para números con decimales. Usá <code>%f</code> en printf para imprimirlos:</p>
<pre><code class="language-c">float pi = 3.1415927f;          // ~7 dígitos de precisión (el sufijo f es importante)
double pi2 = 3.141592653589793; // ~15 dígitos de precisión

printf("%.2f\\n", pi);   // imprime 3.14 (2 decimales)
printf("%f\\n", pi2);    // imprime 3.141593 (6 decimales por defecto)</code></pre>
<p>Si declarás un <code>float</code>, el literal debe llevar el sufijo <code>f</code> (como <code>3.14f</code>). Sin el sufijo, el compilador lo trata como <code>double</code> y puede dar un warning.</p>

<h3>sizeof</h3>
<p>El operador <code>sizeof</code> devuelve el tamaño en bytes de un tipo o variable:</p>
<pre><code class="language-c">sizeof(char)   // → 1 (siempre)
sizeof(int)    // → 4 (típico en 64 bits)</code></pre>
<p>El estándar solo garantiza:</p>
<pre><code>sizeof(char) ≤ sizeof(short) ≤ sizeof(int) ≤ sizeof(long)</code></pre>

<h3>signed y unsigned</h3>
<p>Por defecto los enteros son <code>signed</code> (con signo). Con <code>unsigned</code> solo almacenan valores positivos pero con el doble de rango:</p>
<pre><code class="language-c">signed char y = -127;    // rango: -128 a 127
unsigned char z = 255;   // rango: 0 a 255</code></pre>

<h3>Overflow (desbordamiento)</h3>
<pre><code class="language-c">signed char x = 127;
x = x + 1;
printf("%d\\n", x);  // imprime -128 (¡overflow!)</code></pre>

<h3>Resumen</h3>
<ul>
<li>Toda variable debe declararse con su tipo antes de usarla</li>
<li>Variables sin inicializar contienen basura</li>
<li><code>char</code> usa comillas simples (<code>'A'</code>), las cadenas de texto usan comillas dobles (<code>"hola"</code>)</li>
<li>En <code>printf</code>, cada tipo tiene su especificador: <code>%d</code> para int, <code>%f</code> para float/double, <code>%c</code> para char, <code>%ld</code> para long</li>
<li><code>sizeof</code> te dice el tamaño en bytes (usá <code>%zu</code> para imprimirlo)</li>
<li><code>unsigned</code> duplica el rango positivo pero no permite negativos</li>
<li>El overflow produce resultados inesperados</li>
</ul>`,
          exercises: [
            {
              id: 'tipos-1',
              title: 'Declarar variables',
              instruction: 'Declará las siguientes variables e imprimí sus valores: un entero `edad` con valor 20, un float `altura` con valor 1.75, y un char `inicial` con valor \'L\'. Imprimí cada una en una línea separada.',
              type: 'write',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

int main(void) {
    // Declará las variables acá



    // Imprimí los valores
    printf("Edad: %d\\n", edad);
    printf("Altura: %.2f\\n", altura);
    printf("Inicial: %c\\n", inicial);
    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    int edad = 20;
    float altura = 1.75f;
    char inicial = 'L';

    printf("Edad: %d\\n", edad);
    printf("Altura: %.2f\\n", altura);
    printf("Inicial: %c\\n", inicial);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Edad: 20\nAltura: 1.75\nInicial: L\n', description: 'Debe imprimir los tres valores correctamente' }
              ],
              hints: [
                'Para declarar un entero: int nombre = valor;',
                'Para float usá: float nombre = valor; (podés agregar f al final: 1.75f)',
                'Para char usá comillas simples: char nombre = \'X\';'
              ]
            },
            {
              id: 'tipos-2',
              title: 'Corregir los formatos',
              instruction: 'Este programa usa especificadores de formato incorrectos y tiene errores de tipo. Corregí todos los printf para que usen el formato correcto y las variables tengan el tipo adecuado.',
              type: 'fix-logic',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

int main(void) {
    int temperatura = 36.5;
    char inicial = "M";
    float precio = 49.99;

    printf("Temperatura: %d\\n", temperatura);
    printf("Inicial: %s\\n", inicial);
    printf("Precio: %d\\n", precio);
    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    float temperatura = 36.5f;
    char inicial = 'M';
    float precio = 49.99f;

    printf("Temperatura: %.1f\\n", temperatura);
    printf("Inicial: %c\\n", inicial);
    printf("Precio: %.2f\\n", precio);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Temperatura: 36.5\nInicial: M\nPrecio: 49.99\n', description: 'Debe imprimir los valores correctos con los formatos adecuados' }
              ],
              hints: [
                '36.5 no es un int, es un float. Cambiá el tipo y el especificador.',
                'Un solo caracter usa comillas simples (\'M\') y se imprime con %c, no %s.',
                'float se imprime con %f, no con %d. Usá %.1f o %.2f para controlar decimales.'
              ]
            },
            {
              id: 'tipos-3',
              title: 'Predecir el overflow',
              instruction: '¿Qué imprime este programa? Escribí solo el número que imprime (sin salto de línea extra).',
              type: 'predict',
              difficulty: 'medio',
              starterCode: `// ¿Qué imprime este programa?
// Escribí tu respuesta como: printf("%d\\n", respuesta);

#include <stdio.h>

int main(void) {
    unsigned char x = 255;
    x = x + 1;
    printf("%d\\n", x);
    return 0;
}

// Escribí abajo qué imprime:`,
              solution: `#include <stdio.h>

int main(void) {
    unsigned char x = 255;
    x = x + 1;
    printf("%d\\n", x);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '0\n', description: 'unsigned char 255 + 1 = 0 (overflow)' }
              ],
              hints: [
                'unsigned char tiene rango 0 a 255.',
                'Cuando un unsigned char llega a 255 y le sumás 1, vuelve a 0.',
                'Es como un odómetro que da la vuelta.'
              ]
            }
          ]
        }
      },
      {
        id: 'literales-constantes',
        title: 'Literales, constantes y typedef',
        description: 'Literales numéricos, const, #define, typedef y enumerativos',
        content: {
          theory: `
<h2>Literales, constantes y typedef</h2>
<h3>Objetivos</h3>
<ul>
<li>Conocer los distintos literales en C</li>
<li>Usar <code>const</code> y <code>#define</code></li>
<li>Renombrar tipos con <code>typedef</code></li>
<li>Definir enumerativos con <code>enum</code></li>
<li>Usar <code>&lt;stdint.h&gt;</code></li>
</ul>

<h3>Literales</h3>
<p>Un literal es un valor escrito directamente en el código:</p>
<pre><code class="language-c">97       // int
0x61     // int en hexadecimal (97 decimal)
97U      // unsigned int
97L      // long
97.0     // double
97.0F    // float
'a'      // int (ASCII 97 = 'a')
'\\x61'  // int (97 en hex)</code></pre>

<h3>Constantes</h3>
<pre><code class="language-c">const float PI = 3.1415926f;
PI = 3.0;  // ¡Error! No se puede modificar una constante</code></pre>

<p>También se pueden definir con el preprocesador:</p>
<pre><code class="language-c">#define PI 3.1415926
printf("%f", PI);
// El preprocesador reemplaza PI por 3.1415926 antes de compilar</code></pre>

<h3>typedef</h3>
<p>Permite crear un alias (nombre nuevo) para un tipo existente:</p>
<pre><code class="language-c">typedef unsigned char edad_t;
edad_t edad_juan = 23;</code></pre>

<h3>&lt;stdint.h&gt;</h3>
<p>Tipos con tamaño garantizado:</p>
<pre><code class="language-c">#include &lt;stdint.h&gt;
int8_t   // exactamente 8 bits con signo
uint8_t  // exactamente 8 bits sin signo
int16_t, uint16_t
int32_t, uint32_t</code></pre>

<h3>Enumerativos</h3>
<pre><code class="language-c">typedef enum {
    LUN, MAR, MIE, JUE, VIE, SAB, DOM
} dia_t;

dia_t dia_clase = VIE;
// Internamente: LUN=0, MAR=1, ..., DOM=6</code></pre>

<h3>Conversión de tipos</h3>
<p><strong>Truncado</strong> (se pierde información):</p>
<pre><code class="language-c">int y = 8.5;    // y vale 8 (se pierde el .5)
char x = 129;   // overflow: x vale -127</code></pre>
<p><strong>Promoción</strong> (se amplía sin perder):</p>
<pre><code class="language-c">long w = 200;   // 200 se promueve a long
float z = 30;   // 30 se promueve a 30.0f</code></pre>
<p><strong>Casteo explícito</strong>:</p>
<pre><code class="language-c">int x = 5, y = 2;
float b = x / y;          // b = 2.0 (división entera!)
float c = (float)x / y;   // c = 2.5 (división real)</code></pre>

<h3>Resumen</h3>
<ul>
<li>Los literales tienen tipo implícito que se puede controlar con sufijos (U, L, F)</li>
<li><code>const</code> crea variables que no se pueden modificar</li>
<li><code>typedef</code> crea aliases para tipos existentes</li>
<li><code>enum</code> define conjuntos de constantes enteras con nombre</li>
<li>Cuidado con las conversiones implícitas: pueden truncar o promover</li>
</ul>`,
          exercises: [
            {
              id: 'literales-2',
              title: 'Enumerativo de colores',
              instruction: 'Definí un enum llamado color_t con los valores ROJO, VERDE, AZUL. Luego declará una variable de tipo color_t con valor VERDE e imprimí su valor numérico.',
              type: 'write',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

// Definí el enum acá


int main(void) {
    // Declará la variable e imprimí su valor

    return 0;
}`,
              solution: `#include <stdio.h>

typedef enum { ROJO, VERDE, AZUL } color_t;

int main(void) {
    color_t c = VERDE;
    printf("%d\\n", c);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '1\n', description: 'VERDE es el segundo valor, así que vale 1' }
              ],
              hints: [
                'typedef enum { VALOR1, VALOR2, ... } nombre_t;',
                'El primer valor es 0, el segundo 1, etc.',
                'Usá %d para imprimir el valor numérico del enum.'
              ]
            },
            {
              id: 'literales-1',
              title: 'Conversión de tipos',
              instruction: 'Calculá la división de 5 / 2 de tres formas diferentes e imprimí los resultados: 1) como enteros (resultado entero), 2) casteando el dividendo a float, 3) casteando el divisor a float.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 2;

    // 1. División entera
    int r1 = a / b;
    printf("Entero: %d\\n", r1);

    // 2. Casteando el dividendo


    // 3. Casteando el divisor


    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 2;

    int r1 = a / b;
    printf("Entero: %d\\n", r1);

    float r2 = (float)a / b;
    printf("Cast dividendo: %.1f\\n", r2);

    float r3 = a / (float)b;
    printf("Cast divisor: %.1f\\n", r3);

    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Entero: 2\nCast dividendo: 2.5\nCast divisor: 2.5\n', description: 'Debe mostrar 2, 2.5 y 2.5' }
              ],
              hints: [
                'Para castear usá (float) antes de la variable.',
                'Solo necesitás castear uno de los operandos; el otro se promueve automáticamente.',
                'Usá %.1f para mostrar un decimal.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'control-flujo',
    title: 'Control de flujo',
    description: 'Condicionales (if/else), ciclos (while, for, do-while), switch y operadores lógicos.',
    icon: 'GitBranch',
    difficulty: 'Principiante',
    prerequisites: ['tipos'],
    lessons: [
      {
        id: 'condicionales',
        title: 'Condicionales y operadores',
        description: 'if, else, operadores de comparación y lógicos, bool',
        content: {
          theory: `
<h2>Condicionales</h2>
<h3>Objetivos</h3>
<ul>
<li>Usar <code>if</code>, <code>else if</code> y <code>else</code></li>
<li>Conocer los operadores de comparación y lógicos</li>
<li>Entender qué es "verdadero" y "falso" en C</li>
</ul>

<h3>if / else if / else</h3>
<pre><code class="language-c">if (condicion1) {
    // se ejecuta si condicion1 es verdadera
} else if (condicion2) {
    // se ejecuta si condicion2 es verdadera
} else {
    // se ejecuta si ninguna condición fue verdadera
}</code></pre>

<h3>Operadores de comparación</h3>
<table>
<tr><th>C</th><th>Python</th><th>Significado</th></tr>
<tr><td><code>x == y</code></td><td><code>x == y</code></td><td>Igual</td></tr>
<tr><td><code>x != y</code></td><td><code>x != y</code></td><td>Distinto</td></tr>
<tr><td><code>x &lt; y</code></td><td><code>x &lt; y</code></td><td>Menor</td></tr>
<tr><td><code>x &gt; y</code></td><td><code>x &gt; y</code></td><td>Mayor</td></tr>
<tr><td><code>x &lt;= y</code></td><td><code>x &lt;= y</code></td><td>Menor o igual</td></tr>
<tr><td><code>x &gt;= y</code></td><td><code>x &gt;= y</code></td><td>Mayor o igual</td></tr>
</table>

<h3>Operadores lógicos</h3>
<table>
<tr><th>C</th><th>Python</th></tr>
<tr><td><code>x && y</code></td><td><code>x and y</code></td></tr>
<tr><td><code>x || y</code></td><td><code>x or y</code></td></tr>
<tr><td><code>!x</code></td><td><code>not x</code></td></tr>
</table>

<h3>Verdadero y falso en C</h3>
<p>En C, la condición del <code>if</code> puede ser de <strong>cualquier tipo entero</strong>:</p>
<ul>
<li><code>0</code> → falso</li>
<li>Cualquier otro número → verdadero</li>
</ul>
<p>Desde C99 existe el tipo <code>bool</code>:</p>
<pre><code class="language-c">#include &lt;stdbool.h&gt;
bool condicion = true;
if (condicion) { ... }</code></pre>

<h3>Operador ternario</h3>
<p>Es una forma compacta de escribir un if/else que devuelve un valor:</p>
<pre><code class="language-c">int max = (a > b) ? a : b;
// Equivale a:
// if (a > b) max = a; else max = b;

printf("Es %s\\n", (edad >= 18) ? "mayor" : "menor");</code></pre>

<h3>Llaves opcionales</h3>
<p>Si un bloque tiene una sola instrucción, las llaves son opcionales:</p>
<pre><code class="language-c">if (llueve)
    llevar_paraguas();  // solo esta línea está dentro del if
salir();               // esta siempre se ejecuta</code></pre>
<div class="warning">
<strong>Cuidado:</strong> Esto es una fuente común de errores. Es recomendable usar siempre llaves.
</div>

<h3>Error común: = vs ==</h3>
<p>Un error muy frecuente en C es confundir la asignación (<code>=</code>) con la comparación (<code>==</code>):</p>
<pre><code class="language-c">if (x = 5)  // ¡INCORRECTO! Esto ASIGNA 5 a x (y siempre es verdadero)
if (x == 5) // Correcto: compara si x es igual a 5</code></pre>
<p>El compilador suele advertir sobre esto si usás <code>-Wall</code>.</p>`,
          exercises: [
            {
              id: 'cond-1',
              title: 'Clasificar nota',
              instruction: 'Dado un entero `nota` (entre 1 y 10), imprimí: "Aprobado" si nota >= 4, "Desaprobado" si nota < 4.',
              type: 'complete',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

int main(void) {
    int nota = 6;

    // Tu código acá

    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    int nota = 6;

    if (nota >= 4) {
        printf("Aprobado\\n");
    } else {
        printf("Desaprobado\\n");
    }

    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Aprobado\n', description: '6 >= 4, debe imprimir Aprobado' }
              ],
              hints: [
                'Usá el operador >= para comparar.',
                'if (nota >= 4) { printf("Aprobado\\n"); } else { ... }'
              ]
            },
            {
              id: 'cond-2',
              title: 'Puede votar',
              instruction: 'Usá `<stdbool.h>` para determinar si una persona puede votar. Definí una variable `bool puede_votar` que sea `true` si la edad está entre 16 y 99 (inclusive) Y es ciudadano (`es_ciudadano` ya está definido). Imprimí "Puede votar" o "No puede votar".',
              type: 'complete',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int edad = 20;
    bool es_ciudadano = true;

    // Definí bool puede_votar usando && y comparaciones
    // Imprimí "Puede votar" o "No puede votar"

    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int edad = 20;
    bool es_ciudadano = true;

    bool puede_votar = (edad >= 16 && edad <= 99) && es_ciudadano;

    if (puede_votar) {
        printf("Puede votar\\n");
    } else {
        printf("No puede votar\\n");
    }

    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Puede votar\n', description: 'edad=20, ciudadano=true → Puede votar' }
              ],
              hints: [
                'Necesitás combinar dos condiciones con &&: que la edad esté en rango Y que sea ciudadano.',
                'Para verificar un rango: edad >= 16 && edad <= 99',
                'bool puede_votar = (edad >= 16 && edad <= 99) && es_ciudadano;'
              ]
            },
            {
              id: 'cond-3',
              title: 'Triángulo válido',
              instruction: 'Dados tres lados a, b, c, determiná si forman un triángulo válido. Un triángulo es válido si cada lado es menor que la suma de los otros dos. Usá `<stdbool.h>` y guardá el resultado en `bool es_valido`. Imprimí "Valido" o "Invalido".',
              type: 'complete',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int a = 3, b = 4, c = 5;

    // Definí bool es_valido
    // Un triángulo es válido si:
    // a < b + c  Y  b < a + c  Y  c < a + b

    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int a = 3, b = 4, c = 5;

    bool es_valido = (a < b + c) && (b < a + c) && (c < a + b);

    if (es_valido) {
        printf("Valido\\n");
    } else {
        printf("Invalido\\n");
    }

    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Valido\n', description: '3, 4, 5 forman un triángulo válido' }
              ],
              hints: [
                'La desigualdad triangular dice que cada lado debe ser menor que la suma de los otros dos.',
                'Tenés que verificar las tres condiciones con &&: (a < b + c) && (b < a + c) && (c < a + b)',
                'bool es_valido = (a < b + c) && (b < a + c) && (c < a + b);'
              ]
            },
            {
              id: 'cond-4',
              title: 'Año bisiesto',
              instruction: 'Determiná si un año es bisiesto. Un año es bisiesto si: es divisible por 4 PERO NO por 100, O es divisible por 400. Guardá el resultado en `bool es_bisiesto` y imprimí "Bisiesto" o "No bisiesto".',
              type: 'complete',
              difficulty: 'dificil',
              starterCode: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int anio = 2000;

    // Definí bool es_bisiesto
    // Regla: (divisible por 4 Y NO por 100) O divisible por 400

    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int anio = 2000;

    bool es_bisiesto = (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0);

    if (es_bisiesto) {
        printf("Bisiesto\\n");
    } else {
        printf("No bisiesto\\n");
    }

    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Bisiesto\n', description: '2000 es divisible por 400, es bisiesto' }
              ],
              hints: [
                'Usá el operador % para verificar divisibilidad: anio % 4 == 0',
                'La condición combina && (Y), || (O) y != (distinto): (div por 4 Y NO div por 100) O (div por 400)',
                'bool es_bisiesto = (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0);'
              ]
            }
          ]
        }
      },
      {
        id: 'ciclos',
        title: 'Ciclos: while, for, do-while',
        description: 'Repetición con while, for y do-while',
        content: {
          theory: `
<h2>Ciclos</h2>
<h3>Objetivos</h3>
<ul>
<li>Usar <code>while</code>, <code>for</code> y <code>do-while</code></li>
<li>Entender <code>break</code> y <code>continue</code></li>
<li>Conocer el bloque <code>switch</code></li>
</ul>

<h3>while</h3>
<pre><code class="language-c">while (condicion) {
    // se repite mientras condicion sea verdadera
}</code></pre>

<h3>for</h3>
<pre><code class="language-c">for (inicializacion; condicion; incremento) {
    // bloque
}

// Es equivalente a:
inicializacion;
while (condicion) {
    // bloque
    incremento;
}</code></pre>

<p>Ejemplo: imprimir "hola" 10 veces:</p>
<pre><code class="language-c">for (int i = 0; i &lt; 10; i++) {
    printf("hola\\n");
}</code></pre>
<p>El operador <code>i++</code> incrementa <code>i</code> en 1 (equivale a <code>i = i + 1</code>). También existe <code>i--</code> para decrementar, y <code>i += 3</code> para sumar cualquier cantidad.</p>

<h3>Ciclos anidados</h3>
<p>Un ciclo dentro de otro permite recorrer combinaciones, como filas y columnas:</p>
<pre><code class="language-c">for (int fila = 0; fila &lt; 3; fila++) {
    for (int col = 0; col &lt; 4; col++) {
        printf("(%d,%d) ", fila, col);
    }
    printf("\\n");
}</code></pre>

<h3>do-while</h3>
<p>Ejecuta el bloque <strong>al menos una vez</strong>:</p>
<pre><code class="language-c">do {
    // bloque (se ejecuta al menos una vez)
} while (condicion);</code></pre>

<h3>break y continue</h3>
<ul>
<li><code>break</code> — sale del ciclo inmediatamente</li>
<li><code>continue</code> — salta a la siguiente iteración</li>
</ul>

<h3>switch</h3>
<p>Permite comparar una variable contra múltiples valores constantes. Cada <code>case</code> necesita un <code>break</code>; sin él, la ejecución "cae" al siguiente caso (fall-through):</p>
<pre><code class="language-c">switch (dia) {
    case VIE:
        printf("Ya se termina!\\n");
        break;
    case SAB:
    case DOM:              // SAB "cae" a DOM: ambos imprimen lo mismo
        printf("Finde!\\n");
        break;
    default:               // se ejecuta si ningún case coincide
        printf("Uff...\\n");
        break;
}</code></pre>
<p><code>switch</code> solo funciona con valores enteros (int, char, enum). No se puede usar con cadenas ni con float.</p>`,
          exercises: [
            {
              id: 'ciclos-2',
              title: 'Suma de números',
              instruction: 'Calculá e imprimí la suma de los números del 1 al 100.',
              type: 'write',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

int main(void) {
    int suma = 0;

    // Sumá los números del 1 al 100

    printf("La suma es: %d\\n", suma);
    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    int suma = 0;
    for (int i = 1; i <= 100; i++) {
        suma += i;
    }
    printf("La suma es: %d\\n", suma);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'La suma es: 5050\n', description: 'La suma de 1 a 100 es 5050' }
              ],
              hints: [
                'Usá un acumulador: suma += i;',
                'Recorré con for desde 1 hasta 100.',
              ]
            },
            {
              id: 'ciclos-1',
              title: 'FizzBuzz',
              instruction: 'Imprimí los números del 1 al 20, pero: si es múltiplo de 3 imprimí "Fizz", si es múltiplo de 5 imprimí "Buzz", si es múltiplo de ambos imprimí "FizzBuzz". Caso contrario imprimí el número.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

int main(void) {
    // Tu ciclo acá

    return 0;
}`,
              solution: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 20; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            printf("FizzBuzz\\n");
        } else if (i % 3 == 0) {
            printf("Fizz\\n");
        } else if (i % 5 == 0) {
            printf("Buzz\\n");
        } else {
            printf("%d\\n", i);
        }
    }
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\n', description: 'FizzBuzz del 1 al 20' }
              ],
              hints: [
                'Empezá por el caso más específico: múltiplo de ambos (3 Y 5) va primero.',
                'Usá el operador % (módulo): i % 3 == 0 significa que i es múltiplo de 3.',
                'El orden importa: if (ambos) ... else if (solo 3) ... else if (solo 5) ... else número'
              ]
            },
            {
              id: 'ciclos-3',
              title: 'Números primos',
              instruction: 'Imprimí todos los números primos entre 2 y 30, uno por línea. Un número es primo si solo es divisible por 1 y por sí mismo.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // Para cada número del 2 al 30, verificá si es primo

    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    for (int n = 2; n <= 30; n++) {
        bool es_primo = true;
        for (int d = 2; d < n; d++) {
            if (n % d == 0) {
                es_primo = false;
                break;
            }
        }
        if (es_primo) {
            printf("%d\\n", n);
        }
    }
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '2\n3\n5\n7\n11\n13\n17\n19\n23\n29\n', description: 'Primos entre 2 y 30' }
              ],
              hints: [
                'Para cada número n, verificá si algún número entre 2 y n-1 lo divide exactamente.',
                'Si encontrás un divisor (n % d == 0), no es primo. Usá break para cortar el ciclo interno.',
                'Usá una variable bool es_primo que empiece en true y se ponga en false si encontrás un divisor.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'funciones',
    title: 'Funciones',
    description: 'Declaración, definición, parámetros, retorno, void y recursión.',
    icon: 'Box',
    difficulty: 'Principiante',
    prerequisites: ['control-flujo'],
    lessons: [
      {
        id: 'funciones-basicas',
        title: 'Funciones: declaración y definición',
        description: 'Crear y usar funciones en C',
        content: {
          theory: `
<h2>Funciones</h2>
<h3>Objetivos</h3>
<ul>
<li>Declarar y definir funciones</li>
<li>Entender parámetros y valores de retorno</li>
<li>Usar el tipo <code>void</code></li>
<li>Entender el orden de declaración</li>
</ul>

<h3>Declaración y definición</h3>
<pre><code class="language-c">// Declaración (prototipo): le dice al compilador que la función existe
int sumar(int a, int b);

// Definición: implementa la función
int sumar(int a, int b) {
    return a + b;
}

// Uso
int resultado = sumar(4, 5);  // resultado = 9</code></pre>

<h3>Tipo void</h3>
<pre><code class="language-c">// No recibe parámetros
int f(void) {
    return 8;
}

// No devuelve nada
void g(int x) {
    printf("%d\\n", x);
}</code></pre>

<h3>Orden de declaración</h3>
<p>En C, una función debe estar <strong>declarada</strong> antes de ser usada. Hay tres formas:</p>
<pre><code class="language-c">// Opción 1: definir antes de usar
int sumar(int x, int y) { return x + y; }
int f() { return sumar(5, 4); }

// Opción 2: declarar primero, definir después
int sumar(int x, int y);  // declaración
int f() { return sumar(5, 4); }
int sumar(int x, int y) { return x + y; }  // definición</code></pre>

<h3>Alcance de las variables</h3>
<p>Las variables declaradas dentro de una función (o un bloque <code>{ }</code>) son <strong>locales</strong>: solo existen dentro de ese bloque. Al salir, se destruyen:</p>
<pre><code class="language-c">void f(void) {
    int x = 10;  // x solo existe dentro de f
}
// acá x ya no existe

int main(void) {
    int x = 5;   // esta es OTRA variable x, distinta
    f();
    printf("%d\\n", x);  // imprime 5
}</code></pre>
<p>Los parámetros de una función también son variables locales: son copias del valor que se pasó.</p>

<h3>Recursión</h3>
<p>Una función puede llamarse a sí misma. Toda función recursiva necesita un <strong>caso base</strong> (condición de corte) para no llamarse infinitamente:</p>
<pre><code class="language-c">int factorial(int n) {
    if (n <= 1) return 1;        // caso base
    return n * factorial(n - 1); // caso recursivo
}</code></pre>`,
          exercises: [
            {
              id: 'func-1',
              title: 'Máximo de tres',
              instruction: 'Escribí una función `int max3(int a, int b, int c)` que devuelva el mayor de tres enteros. No podés usar ninguna función de biblioteca. Probala con varios casos.',
              type: 'write',
              difficulty: 'facil',
              starterCode: `#include <stdio.h>

// Escribí la función max3 acá


int main(void) {
    printf("%d\\n", max3(3, 7, 5));
    printf("%d\\n", max3(10, 2, 8));
    printf("%d\\n", max3(1, 1, 1));
    return 0;
}`,
              solution: `#include <stdio.h>

int max3(int a, int b, int c) {
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    return max;
}

int main(void) {
    printf("%d\\n", max3(3, 7, 5));
    printf("%d\\n", max3(10, 2, 8));
    printf("%d\\n", max3(1, 1, 1));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '7\n10\n1\n', description: 'max3(3,7,5)=7, max3(10,2,8)=10, max3(1,1,1)=1' }
              ],
              hints: [
                'Podés asumir que a es el mayor e ir comparando con b y c.',
                'int max = a; if (b > max) max = b; if (c > max) max = c;',
                'También podés usar el operador ternario: (a > b) ? a : b'
              ]
            },
            {
              id: 'func-2',
              title: 'Factorial iterativo',
              instruction: 'Escribí una función factorial que calcule el factorial de n de forma iterativa (con un ciclo). Imprimí el factorial de 5.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

// Escribí la función factorial iterativa


int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
              solution: `#include <stdio.h>

int factorial(int n) {
    int resultado = 1;
    for (int i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '120\n', description: '5! = 120' }
              ],
              hints: [
                'Usá un acumulador que empiece en 1.',
                'Multiplicá el acumulador por cada número de 2 a n.',
                'for (int i = 2; i <= n; i++) resultado *= i;'
              ]
            },
            {
              id: 'func-3',
              title: 'Factorial recursivo',
              instruction: 'Ahora escribí la función factorial de forma recursiva. Imprimí el factorial de 6.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

// Escribí la función factorial recursiva


int main(void) {
    printf("%d\\n", factorial(6));
    return 0;
}`,
              solution: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    printf("%d\\n", factorial(6));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '720\n', description: '6! = 720' }
              ],
              hints: [
                'Caso base: si n <= 1, devolvé 1.',
                'Caso recursivo: n * factorial(n - 1).',
                'Toda función recursiva necesita un caso base para no llamarse infinitamente.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'arreglos',
    title: 'Arreglos',
    description: 'Declaración, inicialización, acceso por índice y pasaje a funciones.',
    icon: 'LayoutList',
    difficulty: 'Intermedio',
    prerequisites: ['funciones'],
    lessons: [
      {
        id: 'arreglos-basicos',
        title: 'Arreglos: fundamentos',
        description: 'Declarar, inicializar y recorrer arreglos',
        content: {
          theory: `
<h2>Arreglos</h2>
<h3>Objetivos</h3>
<ul>
<li>Declarar e inicializar arreglos</li>
<li>Acceder a elementos por índice</li>
<li>Entender los límites del arreglo</li>
<li>Pasar arreglos a funciones</li>
</ul>

<h3>Declaración e inicialización</h3>
<pre><code class="language-c">int valores[4];                        // sin inicializar (¡basura!)
int valores[4] = {10, 20, 32, 40};    // con tamaño explícito
int valores[] = {10, 20, 32, 40};     // tamaño inferido (4)</code></pre>

<h3>Acceso por índice</h3>
<pre><code class="language-c">int valores[] = {10, 20, 32, 40};
valores[2] = 30;  // modifica el tercer elemento
printf("%d\\n", valores[0]);  // imprime 10</code></pre>

<div class="warning">
<strong>⚠️ Out of bounds:</strong> Acceder fuera del rango del arreglo (ej: <code>valores[4]</code> en un arreglo de 4 elementos) es <strong>comportamiento indefinido</strong>. C no verifica los límites.
</div>

<h3>Calcular la cantidad de elementos</h3>
<p>Con <code>sizeof</code> podés calcular cuántos elementos tiene un arreglo dividiendo el tamaño total por el tamaño de un elemento:</p>
<pre><code class="language-c">int valores[] = {10, 20, 30, 40, 50};
int n = sizeof(valores) / sizeof(valores[0]);  // 20 / 4 = 5
printf("Tiene %d elementos\\n", n);</code></pre>
<p>Esto solo funciona en el mismo ámbito donde se declaró el arreglo. Dentro de una función que recibe el arreglo como parámetro, <code>sizeof</code> devuelve el tamaño del puntero, no del arreglo.</p>

<h3>Arreglos como parámetros</h3>
<p>Cuando pasás un arreglo a una función, se pasa como un <strong>puntero al primer elemento</strong>. Por eso hay que pasar también la longitud:</p>
<pre><code class="language-c">void imprimir(int valores[], int n) {
    for (int i = 0; i &lt; n; i++) {
        printf("%d\\n", valores[i]);
    }
}

int main(void) {
    int v[] = {1, 2, 3, 4, 5};
    imprimir(v, 5);
    return 0;
}</code></pre>`,
          exercises: [
            {
              id: 'arr-1',
              title: 'Promedio de arreglo',
              instruction: 'Escribí una función promedio que reciba un arreglo de enteros y su longitud, y devuelva el promedio como float. Probala con {4, 8, 15, 16, 23, 42}.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

// Escribí la función promedio


int main(void) {
    int nums[] = {4, 8, 15, 16, 23, 42};
    printf("%.2f\\n", promedio(nums, 6));
    return 0;
}`,
              solution: `#include <stdio.h>

float promedio(int arr[], int n) {
    int suma = 0;
    for (int i = 0; i < n; i++) {
        suma += arr[i];
    }
    return (float)suma / n;
}

int main(void) {
    int nums[] = {4, 8, 15, 16, 23, 42};
    printf("%.2f\\n", promedio(nums, 6));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '18.00\n', description: 'Promedio de {4,8,15,16,23,42} = 18.00' }
              ],
              hints: [
                'Sumá todos los elementos con un for.',
                'Dividí la suma por n. Cuidado: si ambos son int, la división es entera.',
                'Casteá la suma a float antes de dividir: (float)suma / n'
              ]
            },
            {
              id: 'arr-2',
              title: 'Ordenamiento por selección',
              instruction: 'Implementá una función que ordene un arreglo de enteros usando selection sort. Luego imprimí el arreglo ordenado.',
              type: 'write',
              difficulty: 'dificil',
              starterCode: `#include <stdio.h>

void selection_sort(int arr[], int n) {
    // Implementá selection sort

}

int main(void) {
    int nums[] = {64, 25, 12, 22, 11};
    int n = 5;

    selection_sort(nums, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    return 0;
}`,
              solution: `#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}

int main(void) {
    int nums[] = {64, 25, 12, 22, 11};
    int n = 5;

    selection_sort(nums, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '11 12 22 25 64 \n', description: 'Arreglo ordenado de menor a mayor' }
              ],
              hints: [
                'Selection sort busca el mínimo del subarreglo no ordenado y lo intercambia con el primer elemento de ese subarreglo.',
                'Para cada posición i, buscá el mínimo entre i+1 y n-1.',
                'Para intercambiar, usá una variable temporal: int temp = arr[i]; arr[i] = arr[min]; arr[min] = temp;'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cadenas',
    title: 'Cadenas de caracteres',
    description: 'Cadenas como arreglos de char, terminador nulo, strlen, strcmp, strcpy.',
    icon: 'Type',
    difficulty: 'Intermedio',
    prerequisites: ['arreglos'],
    lessons: [
      {
        id: 'cadenas-basicas',
        title: 'Cadenas: fundamentos',
        description: 'Arreglos de char, \\0, y funciones de string.h',
        content: {
          theory: `
<h2>Cadenas de caracteres</h2>
<h3>Objetivos</h3>
<ul>
<li>Entender las cadenas como arreglos de <code>char</code></li>
<li>Conocer el terminador nulo <code>'\\0'</code></li>
<li>Implementar y usar <code>strlen</code>, <code>strcmp</code>, <code>strcpy</code></li>
</ul>

<h3>Cadenas en C</h3>
<p>Una cadena es un arreglo de <code>char</code> terminado en <code>'\\0'</code> (el caracter nulo, con valor 0). Se escriben entre <strong>comillas dobles</strong> (a diferencia de un solo caracter, que usa comillas simples):</p>
<pre><code class="language-c">char letra = 'A';         // comillas simples: UN caracter (char)
char texto[] = "hola";    // comillas dobles: cadena (arreglo de char)</code></pre>
<p>Estas tres formas son equivalentes:</p>
<pre><code class="language-c">char s[] = {104, 111, 108, 97, 0};      // por valores ASCII
char s[] = {'h', 'o', 'l', 'a', '\\0'};  // por caracteres
char s[] = "hola";                        // literal (agrega \\0 automáticamente)</code></pre>
<p>La cadena "hola" ocupa <strong>5 bytes</strong>: 4 caracteres + el <code>'\\0'</code>.</p>
<p>Para imprimir una cadena con <code>printf</code>, usá el especificador <code>%s</code>:</p>
<pre><code class="language-c">char nombre[] = "Ana";
printf("Hola %s\\n", nombre);  // imprime: Hola Ana</code></pre>

<h3>strlen</h3>
<p>Devuelve la longitud de una cadena (sin contar el <code>'\\0'</code>):</p>
<pre><code class="language-c">int longitud(char s[]) {
    int i = 0;
    while (s[i] != '\\0') {
        i++;
    }
    return i;
}</code></pre>

<h3>Comparación de cadenas</h3>
<pre><code class="language-c">char s1[] = "hola";
char s2[] = "hola";

if (s1 == s2) { ... }          // ¡INCORRECTO! Compara direcciones de memoria
if (strcmp(s1, s2) == 0) { ... } // Correcto: compara contenido</code></pre>

<h3>Funciones de string.h</h3>
<p>La biblioteca <code>&lt;string.h&gt;</code> tiene funciones para trabajar con cadenas. Las más usadas:</p>
<table>
<tr><th>Función</th><th>Descripción</th></tr>
<tr><td><code>strlen(s)</code></td><td>Longitud de s (sin contar el \\0)</td></tr>
<tr><td><code>strcmp(a, b)</code></td><td>Compara a y b: devuelve 0 si son iguales</td></tr>
<tr><td><code>strcpy(dst, src)</code></td><td>Copia src en dst</td></tr>
<tr><td><code>strcat(dst, src)</code></td><td>Concatena src al final de dst</td></tr>
<tr><td><code>strncpy(dst, src, n)</code></td><td>Copia hasta n caracteres (más seguro)</td></tr>
</table>
<pre><code class="language-c">#include &lt;string.h&gt;

char destino[20];
strcpy(destino, "hola");          // destino = "hola"
strcat(destino, " mundo");        // destino = "hola mundo"
printf("%zu\\n", strlen(destino)); // imprime 10</code></pre>
<div class="warning">
<strong>Cuidado:</strong> Siempre asegurate de que el arreglo destino tenga suficiente espacio. Copiar una cadena más larga que el arreglo es un error de memoria muy común.
</div>`,
          exercises: [
            {
              id: 'cad-1',
              title: 'Implementar strlen',
              instruction: 'Implementá la función mi_strlen que reciba un const char* y devuelva la longitud de la cadena (sin contar el \\0), de forma iterativa.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

unsigned int mi_strlen(const char *s) {
    // Tu implementación

}

int main(void) {
    printf("%u\\n", mi_strlen("hola"));
    printf("%u\\n", mi_strlen(""));
    printf("%u\\n", mi_strlen("Lenguaje C"));
    return 0;
}`,
              solution: `#include <stdio.h>

unsigned int mi_strlen(const char *s) {
    unsigned int i = 0;
    while (s[i] != '\\0') {
        i++;
    }
    return i;
}

int main(void) {
    printf("%u\\n", mi_strlen("hola"));
    printf("%u\\n", mi_strlen(""));
    printf("%u\\n", mi_strlen("Lenguaje C"));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '4\n0\n10\n', description: 'strlen de "hola"=4, ""=0, "Lenguaje C"=10' }
              ],
              hints: [
                'Recorré la cadena con un while hasta encontrar \\0.',
                'Contá cuántos caracteres hay antes del \\0.',
                'while (s[i] != \'\\0\') { i++; }'
              ]
            },
            {
              id: 'cad-2',
              title: 'Invertir cadena',
              instruction: 'Implementá void invertir(char *s) que invierta la cadena s in-place (sin usar otra cadena).',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <string.h>

void invertir(char *s) {
    // Tu implementación

}

int main(void) {
    char texto[] = "hola";
    invertir(texto);
    printf("%s\\n", texto);
    return 0;
}`,
              solution: `#include <stdio.h>
#include <string.h>

void invertir(char *s) {
    int len = strlen(s);
    for (int i = 0; i < len / 2; i++) {
        char temp = s[i];
        s[i] = s[len - 1 - i];
        s[len - 1 - i] = temp;
    }
}

int main(void) {
    char texto[] = "hola";
    invertir(texto);
    printf("%s\\n", texto);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'aloh\n', description: '"hola" invertido es "aloh"' }
              ],
              hints: [
                'Intercambiá el primer caracter con el último, el segundo con el anteúltimo, etc.',
                'Solo necesitás recorrer hasta la mitad de la cadena.',
                'Usá strlen para obtener la longitud.'
              ]
            },
            {
              id: 'cad-3',
              title: 'Enmarcar texto',
              instruction: 'Implementá una función que reciba una cadena y la imprima enmarcada con asteriscos. Por ejemplo, para "Lenguaje C" debe imprimir:\\n**************\\n* Lenguaje C *\\n**************',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <string.h>

void enmarcar(const char *s) {
    // Tu implementación

}

int main(void) {
    enmarcar("Lenguaje C");
    return 0;
}`,
              solution: `#include <stdio.h>
#include <string.h>

void enmarcar(const char *s) {
    int len = strlen(s);
    for (int i = 0; i < len + 4; i++) printf("*");
    printf("\\n");
    printf("* %s *\\n", s);
    for (int i = 0; i < len + 4; i++) printf("*");
    printf("\\n");
}

int main(void) {
    enmarcar("Lenguaje C");
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '**************\n* Lenguaje C *\n**************\n', description: 'Texto enmarcado con asteriscos' }
              ],
              hints: [
                'La línea de asteriscos tiene longitud = largo de la cadena + 4 (por los "* " y " *").',
                'Usá un for para imprimir los asteriscos de arriba y abajo.',
                'La línea del medio es: * texto *'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'punteros',
    title: 'Punteros',
    description: 'Direcciones de memoria, operadores & y *, pasaje por referencia, aritmética de punteros.',
    icon: 'Navigation',
    difficulty: 'Intermedio',
    prerequisites: ['arreglos'],
    lessons: [
      {
        id: 'punteros-basicos',
        title: 'Punteros: fundamentos',
        description: 'Operadores & y *, pasaje por referencia',
        content: {
          theory: `
<h2>Punteros</h2>
<h3>Objetivos</h3>
<ul>
<li>Entender qué es un puntero</li>
<li>Usar los operadores <code>&</code> y <code>*</code></li>
<li>Pasaje por valor vs por referencia</li>
<li>Relación entre arreglos y punteros</li>
</ul>

<h3>Pasaje por valor</h3>
<p>En C, los argumentos se pasan <strong>por valor</strong> (se copia el valor):</p>
<pre><code class="language-c">void f(int v) {
    v = 5;  // modifica la COPIA
}

int main() {
    int i = 4;
    f(i);
    printf("%d", i);  // imprime 4 (no cambió)
}</code></pre>

<h3>Pasaje por referencia (con punteros)</h3>
<pre><code class="language-c">void f(int *v) {
    *v = 5;  // modifica el valor ORIGINAL
}

int main() {
    int i = 4;
    f(&i);           // &i = dirección de i
    printf("%d", i);  // imprime 5 (¡cambió!)
}</code></pre>

<h3>Operadores</h3>
<ul>
<li><code>&x</code> — dirección de memoria de x</li>
<li><code>*p</code> — valor apuntado por p (desreferenciar)</li>
</ul>
<pre><code class="language-c">float x = 3.14;
float *p = &x;
printf("%p", p);    // dirección de x
printf("%f", *p);   // 3.14</code></pre>

<h3>Arreglos y punteros</h3>
<pre><code class="language-c">int valores[] = {10, 20, 30, 40};
int *p = valores;    // valores "decae" a puntero al primer elemento

printf("%d", *p);        // 10
printf("%d", *(p + 2));  // 30
printf("%d", p[2]);      // 30 (equivalente)
// p[x] es lo mismo que *(p + x)</code></pre>

<h3>void* y NULL</h3>
<pre><code class="language-c">void *p;        // puntero genérico (puede apuntar a cualquier tipo)
int *p = NULL;  // puntero nulo (no apunta a nada)</code></pre>
<p><code>NULL</code> es un valor especial que indica que el puntero no apunta a ninguna dirección válida. Desreferenciar un puntero <code>NULL</code> (<code>*p</code>) causa un crash. Siempre es buena práctica verificar antes de usar un puntero:</p>
<pre><code class="language-c">if (p != NULL) {
    printf("Valor: %d\\n", *p);
}</code></pre>
<p>Para imprimir una dirección de memoria usá el especificador <code>%p</code>:</p>
<pre><code class="language-c">int x = 42;
printf("Dirección de x: %p\\n", (void *)&x);</code></pre>`,
          exercises: [
            {
              id: 'ptr-1',
              title: 'Intercambiar valores',
              instruction: 'Escribí una función swap que reciba dos punteros a int e intercambie sus valores. Usala para intercambiar a=5 y b=10.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

void swap(int *a, int *b) {
    // Tu implementación

}

int main(void) {
    int a = 5, b = 10;
    printf("Antes: a=%d, b=%d\\n", a, b);
    swap(&a, &b);
    printf("Despues: a=%d, b=%d\\n", a, b);
    return 0;
}`,
              solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int a = 5, b = 10;
    printf("Antes: a=%d, b=%d\\n", a, b);
    swap(&a, &b);
    printf("Despues: a=%d, b=%d\\n", a, b);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Antes: a=5, b=10\nDespues: a=10, b=5\n', description: 'Los valores deben intercambiarse' }
              ],
              hints: [
                'Necesitás una variable temporal para guardar uno de los valores.',
                'int temp = *a; *a = *b; *b = temp;',
                'Recordá que *a accede al valor apuntado por a.'
              ]
            },
            {
              id: 'ptr-2',
              title: 'Devolver múltiples valores',
              instruction: 'Escribí una función a_hms que convierta una cantidad de segundos a horas, minutos y segundos, usando punteros para devolver los tres valores.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

void a_hms(int segundos, int *h, int *m, int *s) {
    // Tu implementación

}

int main(void) {
    int h, m, s;
    a_hms(3661, &h, &m, &s);
    printf("%d:%02d:%02d\\n", h, m, s);
    return 0;
}`,
              solution: `#include <stdio.h>

void a_hms(int segundos, int *h, int *m, int *s) {
    *h = segundos / 3600;
    *m = (segundos % 3600) / 60;
    *s = (segundos % 3600) % 60;
}

int main(void) {
    int h, m, s;
    a_hms(3661, &h, &m, &s);
    printf("%d:%02d:%02d\\n", h, m, s);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '1:01:01\n', description: '3661 segundos = 1:01:01' }
              ],
              hints: [
                'Horas = segundos / 3600',
                'Minutos = (segundos % 3600) / 60',
                'Segundos restantes = (segundos % 3600) % 60'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'memoria',
    title: 'Memoria dinámica',
    description: 'Stack vs heap, malloc, free, errores comunes, arreglos dinámicos.',
    icon: 'HardDrive',
    difficulty: 'Avanzado',
    prerequisites: ['punteros'],
    lessons: [
      {
        id: 'malloc-free',
        title: 'malloc y free',
        description: 'Reservar y liberar memoria dinámica',
        content: {
          theory: `
<h2>Memoria dinámica</h2>
<h3>Objetivos</h3>
<ul>
<li>Diferenciar stack y heap</li>
<li>Usar <code>malloc</code> y <code>free</code></li>
<li>Entender errores comunes de memoria</li>
</ul>

<h3>Stack vs Heap</h3>
<p>Las variables locales viven en el <strong>stack</strong> (se liberan automáticamente al salir de la función). Con <code>malloc</code> reservamos memoria en el <strong>heap</strong> (persiste hasta que la liberemos con <code>free</code>).</p>

<h3>malloc y free</h3>
<pre><code class="language-c">#include &lt;stdlib.h&gt;

int *p = malloc(200 * sizeof(int)); // reserva espacio para 200 ints
if (p == NULL) {
    // error: no se pudo reservar memoria
}

// usar p...
p[0] = 42;

free(p);  // liberar la memoria cuando ya no la necesitamos</code></pre>

<h3>calloc y realloc</h3>
<p>Además de <code>malloc</code>, hay otras funciones útiles para manejar memoria:</p>
<pre><code class="language-c">int *p = calloc(200, sizeof(int));  // como malloc, pero inicializa todo a 0
p = realloc(p, 400 * sizeof(int));  // agranda (o achica) el bloque de memoria</code></pre>
<p><code>calloc</code> es útil cuando querés que la memoria empiece en cero. <code>realloc</code> permite cambiar el tamaño de un bloque ya reservado, copiando los datos existentes al nuevo bloque.</p>

<h3>Errores comunes</h3>
<div class="warning">
<p><strong>Memory leak:</strong> No liberar memoria reservada con malloc.</p>
<p><strong>Double free:</strong> Liberar la misma memoria dos veces.</p>
<p><strong>Use after free:</strong> Usar un puntero después de liberar su memoria.</p>
<p><strong>Puntero sin inicializar:</strong> Usar un puntero que no apunta a ningún lado.</p>
</div>

<pre><code class="language-c">// Ejemplo de error: puntero sin inicializar
char *nombre;   // ¡No apunta a nada!
fgets(nombre, 100, stdin);  // ¡Crash! (undefined behavior)

// Corrección:
char *nombre = malloc(100);
fgets(nombre, 100, stdin);
// ...
free(nombre);</code></pre>`,
          exercises: [
            {
              id: 'mem-2',
              title: 'Encontrar el error',
              instruction: 'Este programa tiene un error de memoria. Identificalo y corregilo.',
              type: 'fix-logic',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <stdlib.h>

void f() {
    int *p = malloc(sizeof(int) * 100);
    for (int i = 0; i < 10; i++) {
        p[i] = i + 1000;
    }
    for (int j = 0; j < 100; j++) {
        printf("%d\\n", p[j]);
    }
}

int main(void) {
    f();
    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdlib.h>

void f() {
    int *p = malloc(sizeof(int) * 100);
    if (p == NULL) return;
    for (int i = 0; i < 100; i++) {
        p[i] = i + 1000;
    }
    for (int j = 0; j < 100; j++) {
        printf("%d\\n", p[j]);
    }
    free(p);
}

int main(void) {
    f();
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '', description: 'El programa debe compilar, ejecutar sin errores de memoria y liberar la memoria' }
              ],
              hints: [
                'Hay dos problemas: uno con la inicialización y otro con la liberación de memoria.',
                'Solo se inicializan 10 de los 100 elementos. Los otros 90 tienen basura.',
                'Falta liberar la memoria con free(p) al final de la función.'
              ]
            },
            {
              id: 'mem-1',
              title: 'Repetir cadena',
              instruction: 'Escribí una función que reciba una cadena s y un entero n, y devuelva una nueva cadena (en el heap) que contenga s repetida n veces. No te olvides de liberar la memoria en main.',
              type: 'write',
              difficulty: 'dificil',
              starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *repetir(const char *s, int n) {
    // Tu implementación

}

int main(void) {
    char *resultado = repetir("hola", 3);
    if (resultado != NULL) {
        printf("%s\\n", resultado);
        free(resultado);
    }
    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *repetir(const char *s, int n) {
    int len = strlen(s);
    char *r = malloc(len * n + 1);
    if (r == NULL) return NULL;
    r[0] = '\\0';
    for (int i = 0; i < n; i++) {
        strcat(r, s);
    }
    return r;
}

int main(void) {
    char *resultado = repetir("hola", 3);
    if (resultado != NULL) {
        printf("%s\\n", resultado);
        free(resultado);
    }
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'holaholahola\n', description: '"hola" repetido 3 veces' }
              ],
              hints: [
                'El tamaño necesario es strlen(s) * n + 1 (para el \\0).',
                'Usá malloc para reservar la memoria.',
                'Podés usar strcat para ir concatenando, o copiar manualmente con un for.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'bits',
    title: 'Operaciones de bits',
    description: 'Operadores bitwise (&, |, ^, ~, <<, >>), máscaras y flags.',
    icon: 'Binary',
    difficulty: 'Avanzado',
    prerequisites: ['tipos'],
    lessons: [
      {
        id: 'operadores-bits',
        title: 'Operadores de bits',
        description: 'AND, OR, XOR, NOT, shift',
        content: {
          theory: `
<h2>Operaciones de bits</h2>
<h3>Objetivos</h3>
<ul>
<li>Usar los operadores <code>&</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code></li>
<li>Aplicar máscaras de bits</li>
<li>Usar flags con enum</li>
</ul>

<h3>Operadores</h3>
<table>
<tr><th>Operador</th><th>Nombre</th><th>Ejemplo</th></tr>
<tr><td><code>&</code></td><td>AND</td><td><code>0xC8 & 0xB8 = 0x88</code></td></tr>
<tr><td><code>|</code></td><td>OR</td><td><code>0xC8 | 0xB8 = 0xF8</code></td></tr>
<tr><td><code>^</code></td><td>XOR</td><td><code>0xC8 ^ 0xB8 = 0x70</code></td></tr>
<tr><td><code>~</code></td><td>NOT</td><td><code>~0xB8 = 0x47</code></td></tr>
<tr><td><code>&lt;&lt;</code></td><td>Shift left</td><td><code>0x32 &lt;&lt; 2 = 0xC8</code></td></tr>
<tr><td><code>&gt;&gt;</code></td><td>Shift right</td><td><code>0xC8 &gt;&gt; 2 = 0x32</code></td></tr>
</table>

<h3>Máscaras de bits</h3>
<pre><code class="language-c">uint32_t color = 0xADFF9A;
uint8_t r = (color & 0xFF0000) >> 16;  // 0xAD
uint8_t g = (color & 0x00FF00) >> 8;   // 0xFF
uint8_t b = color & 0x0000FF;          // 0x9A</code></pre>

<h3>Flags</h3>
<pre><code class="language-c">typedef enum {
    AGUA      = 0x01,  // 0000 0001
    FUEGO     = 0x02,  // 0000 0010
    PLANTA    = 0x10,  // 0001 0000
    VENENO    = 0x20,  // 0010 0000
} tipo_pokemon_t;

tipo_pokemon_t bulbasaur = PLANTA | VENENO;  // combina dos tipos</code></pre>`,
          exercises: [
            {
              id: 'bits-1',
              title: 'Extraer componentes de color',
              instruction: 'Dado un color RGB de 24 bits almacenado en un uint32_t, extraé e imprimí los componentes R, G y B.',
              type: 'complete',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t color = 0xFF8040;

    // Extraé R, G, B usando máscaras y shifts
    uint8_t r = 0; // completá
    uint8_t g = 0; // completá
    uint8_t b = 0; // completá

    printf("R=%d, G=%d, B=%d\\n", r, g, b);
    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t color = 0xFF8040;

    uint8_t r = (color & 0xFF0000) >> 16;
    uint8_t g = (color & 0x00FF00) >> 8;
    uint8_t b = color & 0x0000FF;

    printf("R=%d, G=%d, B=%d\\n", r, g, b);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'R=255, G=128, B=64\n', description: '0xFF8040 → R=255, G=128, B=64' }
              ],
              hints: [
                'R está en los bits 16-23: (color & 0xFF0000) >> 16',
                'G está en los bits 8-15: (color & 0x00FF00) >> 8',
                'B está en los bits 0-7: color & 0x0000FF'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'structs',
    title: 'Estructuras',
    description: 'Definir structs, typedef, acceso con punto y flecha, punteros a structs.',
    icon: 'Boxes',
    difficulty: 'Intermedio',
    prerequisites: ['punteros'],
    lessons: [
      {
        id: 'structs-basicos',
        title: 'Estructuras: fundamentos',
        description: 'struct, typedef, campos, punteros a structs',
        content: {
          theory: `
<h2>Estructuras</h2>
<h3>Objetivos</h3>
<ul>
<li>Definir estructuras con <code>struct</code></li>
<li>Usar <code>typedef struct</code></li>
<li>Acceder a campos con <code>.</code> y <code>-></code></li>
<li>Pasar structs por puntero</li>
</ul>

<h3>Definición</h3>
<pre><code class="language-c">struct pokemon {
    int id;
    char nombre[30];
};

// Con typedef (más práctico):
typedef struct {
    int id;
    char nombre[30];
} pokemon_t;</code></pre>

<h3>Uso</h3>
<pre><code class="language-c">pokemon_t pikachu = {25, "pikachu"};
pokemon_t bulbasaur = {
    .id = 1,
    .nombre = "bulbasaur",
};

printf("%s\\n", pikachu.nombre);  // "pikachu"</code></pre>

<h3>Punteros a structs</h3>
<pre><code class="language-c">void mostrar(pokemon_t *p) {
    printf("[%s - Pokedex nro %d]\\n", p->nombre, p->id);
    // p->x es lo mismo que (*p).x
}

pokemon_t p = {25, "pikachu"};
mostrar(&p);</code></pre>
<p>Pasar por puntero es más <strong>eficiente</strong> porque no se copia toda la estructura.</p>

<h3>Resumen de acceso</h3>
<ul>
<li><code>variable.campo</code> — cuando tenés la estructura directamente</li>
<li><code>puntero->campo</code> — cuando tenés un puntero a la estructura (equivale a <code>(*puntero).campo</code>)</li>
</ul>
<p>Para imprimir campos de una estructura, usá el especificador de formato que corresponda al tipo de cada campo (<code>%s</code> para cadenas, <code>%d</code> para enteros, etc.).</p>`,
          exercises: [
            {
              id: 'struct-1',
              title: 'Distancia entre puntos',
              instruction: 'Definí una estructura `punto_t` con campos `x` e `y` (ambos `float`). Escribí una función `float distancia(punto_t a, punto_t b)` que calcule la distancia euclidiana entre dos puntos. Usá `sqrtf` de `<math.h>`.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <math.h>

// Definí punto_t y la función distancia


int main(void) {
    punto_t a = {0.0f, 0.0f};
    punto_t b = {3.0f, 4.0f};
    printf("%.1f\\n", distancia(a, b));
    return 0;
}`,
              solution: `#include <stdio.h>
#include <math.h>

typedef struct {
    float x;
    float y;
} punto_t;

float distancia(punto_t a, punto_t b) {
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrtf(dx * dx + dy * dy);
}

int main(void) {
    punto_t a = {0.0f, 0.0f};
    punto_t b = {3.0f, 4.0f};
    printf("%.1f\\n", distancia(a, b));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: '5.0\n', description: 'Distancia entre (0,0) y (3,4) = 5.0' }
              ],
              hints: [
                'La distancia euclidiana es sqrt((x2-x1)² + (y2-y1)²).',
                'Accedé a los campos con punto: a.x, b.y',
                'Usá sqrtf() de math.h para la raíz cuadrada de floats.'
              ]
            },
            {
              id: 'struct-2',
              title: 'Cumpleaños con punteros',
              instruction: 'Escribí una función `void cumplir_anios(persona_t *p)` que incremente la edad de una persona usando el operador `->`. Imprimí la edad antes y después.',
              type: 'write',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

typedef struct {
    char nombre[100];
    int edad;
} persona_t;

// Escribí la función cumplir_anios


int main(void) {
    persona_t p = {"Ana", 20};
    printf("Antes: %s tiene %d\\n", p.nombre, p.edad);
    cumplir_anios(&p);
    printf("Despues: %s tiene %d\\n", p.nombre, p.edad);
    return 0;
}`,
              solution: `#include <stdio.h>

typedef struct {
    char nombre[100];
    int edad;
} persona_t;

void cumplir_anios(persona_t *p) {
    p->edad++;
}

int main(void) {
    persona_t p = {"Ana", 20};
    printf("Antes: %s tiene %d\\n", p.nombre, p.edad);
    cumplir_anios(&p);
    printf("Despues: %s tiene %d\\n", p.nombre, p.edad);
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Antes: Ana tiene 20\nDespues: Ana tiene 21\n', description: 'La edad debe incrementarse de 20 a 21' }
              ],
              hints: [
                'Recibís un puntero a persona_t, así que usá -> para acceder a los campos.',
                'p->edad es equivalente a (*p).edad',
                'Para incrementar: p->edad++ o p->edad = p->edad + 1'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'io-archivos',
    title: 'Entrada/Salida y archivos',
    description: 'stdin/stdout/stderr, printf, fgets, archivos de texto y binarios.',
    icon: 'FileText',
    difficulty: 'Avanzado',
    prerequisites: ['punteros', 'structs'],
    lessons: [
      {
        id: 'io-basica',
        title: 'Entrada/Salida estándar',
        description: 'printf, fgets, getchar, atoi',
        content: {
          theory: `
<h2>Entrada/Salida</h2>
<h3>Objetivos</h3>
<ul>
<li>Usar <code>printf</code>, <code>puts</code>, <code>fputs</code></li>
<li>Leer entrada con <code>fgets</code> y <code>getchar</code></li>
<li>Convertir texto a número con <code>atoi</code></li>
</ul>

<h3>Salida con printf</h3>
<p><code>printf</code> puede formatear la salida con opciones de ancho y precisión:</p>
<pre><code class="language-c">printf("%10d\\n", 42);       // "        42" (ancho mínimo 10, alineado a la derecha)
printf("%-10d|\\n", 42);    // "42        |" (alineado a la izquierda)
printf("%06d\\n", 42);      // "000042" (relleno con ceros)
printf("%.3f\\n", 3.14159); // "3.142" (3 decimales)</code></pre>

<p>Otras funciones de salida:</p>
<pre><code class="language-c">puts("hola");                     // imprime + salto de línea automático
fputs("hola\\n", stdout);         // sin salto de línea automático
fprintf(stderr, "Error!\\n");     // imprime en stderr (errores)</code></pre>

<h3>Entrada</h3>
<pre><code class="language-c">int c = getchar();        // lee un caracter

char s[30];
fgets(s, 30, stdin);      // lee una línea (hasta 29 chars + \\0)

int n = atoi(s);           // convierte string a int</code></pre>
<div class="warning">
<strong>Sobre scanf:</strong> Existe <code>scanf</code> para leer datos formateados (<code>scanf("%d", &n)</code>), pero es propenso a errores con el buffer de entrada. En general es más seguro leer con <code>fgets</code> y luego convertir con <code>atoi</code>, <code>atof</code> o <code>strtol</code>.
</div>

<h3>Archivos</h3>
<pre><code class="language-c">FILE *f = fopen("datos.txt", "r");  // abrir para lectura
if (f == NULL) {
    perror("Error al abrir");
    return 1;
}

char buf[128];
while (fgets(buf, sizeof(buf), f) != NULL) {
    fputs(buf, stdout);
}

fclose(f);  // siempre cerrar el archivo</code></pre>

<h3>Archivos binarios</h3>
<pre><code class="language-c">FILE *f = fopen("datos.bin", "wb");
int numeros[] = {1, 2, 3, 4, 5};
fwrite(numeros, sizeof(int), 5, f);
fclose(f);

// Leer:
FILE *f2 = fopen("datos.bin", "rb");
int leidos[5];
fread(leidos, sizeof(int), 5, f2);
fclose(f2);</code></pre>`,
          exercises: [
            {
              id: 'io-1',
              title: 'Función input',
              instruction: 'Escribí una función input que reciba un mensaje, lo imprima, lea una línea de texto de stdin y la devuelva (en el heap). Asumí máximo 100 caracteres.',
              type: 'write',
              difficulty: 'dificil',
              starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *input(const char *mensaje) {
    // Tu implementación

}

int main(void) {
    char *nombre = input("Tu nombre: ");
    if (nombre != NULL) {
        printf("Hola %s\\n", nombre);
        free(nombre);
    }
    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *input(const char *mensaje) {
    fputs(mensaje, stdout);
    char buf[101];
    if (fgets(buf, sizeof(buf), stdin) == NULL) return NULL;
    int len = strlen(buf);
    if (len > 0 && buf[len - 1] == '\\n') buf[len - 1] = '\\0';
    char *resultado = malloc(strlen(buf) + 1);
    if (resultado == NULL) return NULL;
    strcpy(resultado, buf);
    return resultado;
}

int main(void) {
    char *nombre = input("Tu nombre: ");
    if (nombre != NULL) {
        printf("Hola %s\\n", nombre);
        free(nombre);
    }
    return 0;
}`,
              testCases: [
                { input: 'Lolo\n', expectedOutput: 'Tu nombre: Hola Lolo\n', description: 'Debe leer un nombre e imprimir el saludo' }
              ],
              hints: [
                'Usá fputs para imprimir el mensaje (sin salto de línea extra).',
                'Leé con fgets en un buffer local de 101 chars.',
                'Reservá memoria con malloc, copiá con strcpy y devolvé el puntero.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'modularizacion',
    title: 'Modularización',
    description: 'Archivos .c y .h, static, extern, include guards.',
    icon: 'FolderTree',
    difficulty: 'Avanzado',
    prerequisites: ['funciones'],
    lessons: [
      {
        id: 'modulos',
        title: 'Módulos en C',
        description: 'Separar código en múltiples archivos',
        content: {
          theory: `
<h2>Modularización</h2>
<h3>Objetivos</h3>
<ul>
<li>Separar código en archivos <code>.c</code> y <code>.h</code></li>
<li>Entender <code>static</code> y <code>extern</code></li>
<li>Proteger contra inclusión múltiple</li>
</ul>

<h3>Archivos .c y .h</h3>
<p>Un módulo en C se compone de:</p>
<ul>
<li><code>.h</code> (header): declaraciones públicas (prototipos de funciones, tipos)</li>
<li><code>.c</code> (source): implementación</li>
</ul>

<pre><code class="language-c">// vector.h
#ifndef VECTOR_H
#define VECTOR_H

float vector_modulo(float x, float y);

#endif</code></pre>

<pre><code class="language-c">// vector.c
#include "vector.h"
#include &lt;math.h&gt;

float vector_modulo(float x, float y) {
    return sqrt(x * x + y * y);
}</code></pre>

<h3>static y extern</h3>
<ul>
<li><code>static</code> en una función o variable global → <strong>privada</strong> al archivo (no visible desde otros módulos)</li>
<li><code>extern</code> en un header → declara que la variable existe en otro archivo</li>
</ul>

<h3>Include guards</h3>
<p>Evitan que un header se incluya más de una vez:</p>
<pre><code class="language-c">#ifndef MI_MODULO_H
#define MI_MODULO_H

// contenido del header

#endif</code></pre>`,
          exercises: [
            {
              id: 'mod-1',
              title: 'Concepto de static',
              instruction: '¿Qué significa que una función sea static en C? Escribí un programa con una función static y otra no-static, y usá ambas desde main.',
              type: 'concept',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>

// Definí una función static y otra no-static


int main(void) {
    // Usá ambas funciones

    return 0;
}`,
              solution: `#include <stdio.h>

static int cuadrado(int x) {
    return x * x;
}

int cubo(int x) {
    return x * x * x;
}

int main(void) {
    printf("Cuadrado de 5: %d\\n", cuadrado(5));
    printf("Cubo de 3: %d\\n", cubo(3));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Cuadrado de 5: 25\nCubo de 3: 27\n', description: 'Debe mostrar el cuadrado y el cubo' }
              ],
              hints: [
                'static antes de una función la hace privada al archivo.',
                'Sin static, la función es visible desde otros archivos (si se declara en un .h).',
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'punteros-funciones',
    title: 'Punteros a funciones',
    description: 'Sintaxis, typedef, callbacks, qsort y tablas de búsqueda.',
    icon: 'Pointer',
    difficulty: 'Avanzado',
    prerequisites: ['punteros', 'funciones'],
    lessons: [
      {
        id: 'func-pointers',
        title: 'Punteros a funciones',
        description: 'Pasar funciones como parámetros, qsort, tablas de búsqueda',
        content: {
          theory: `
<h2>Punteros a funciones</h2>
<h3>Objetivos</h3>
<ul>
<li>Declarar punteros a funciones</li>
<li>Pasar funciones como parámetros</li>
<li>Usar <code>qsort</code></li>
<li>Crear tablas de búsqueda</li>
</ul>

<h3>Sintaxis</h3>
<pre><code class="language-c">int (*p)(void);  // puntero a función que recibe void y devuelve int</code></pre>

<h3>Ejemplo: función genérica</h3>
<pre><code class="language-c">#include &lt;ctype.h&gt;

size_t contar(const char *s, int (*f)(int)) {
    size_t r = 0;
    for (const char *c = s; *c != '\\0'; c++) {
        if (f(*c)) r++;
    }
    return r;
}

size_t mayusculas = contar(texto, isupper);
size_t digitos = contar(texto, isdigit);</code></pre>

<h3>typedef</h3>
<pre><code class="language-c">typedef int (*fchequeo_t)(int);
size_t contar(const char *s, fchequeo_t f) { ... }</code></pre>

<h3>qsort</h3>
<pre><code class="language-c">void qsort(void *base, size_t nmemb, size_t size,
            int (*compar)(const void *, const void *));</code></pre>

<h3>Tablas de búsqueda</h3>
<pre><code class="language-c">typedef void (*accion_t)(void);
accion_t acciones[] = {
    ['w'] = acelerar,
    ['s'] = frenar,
};
char tecla = getchar();
acciones[tecla]();</code></pre>`,
          exercises: [
            {
              id: 'fp-1',
              title: 'Contar con callback',
              instruction: 'Implementá la función contar que reciba una cadena y un puntero a función, y cuente cuántos caracteres cumplen con la función. Probala con isupper e islower.',
              type: 'write',
              difficulty: 'dificil',
              starterCode: `#include <stdio.h>
#include <ctype.h>

// Implementá la función contar


int main(void) {
    const char *texto = "Hola Mundo 123";
    printf("Mayusculas: %zu\\n", contar(texto, isupper));
    printf("Minusculas: %zu\\n", contar(texto, islower));
    printf("Digitos: %zu\\n", contar(texto, isdigit));
    return 0;
}`,
              solution: `#include <stdio.h>
#include <ctype.h>

size_t contar(const char *s, int (*f)(int)) {
    size_t r = 0;
    for (const char *c = s; *c != '\\0'; c++) {
        if (f(*c)) r++;
    }
    return r;
}

int main(void) {
    const char *texto = "Hola Mundo 123";
    printf("Mayusculas: %zu\\n", contar(texto, isupper));
    printf("Minusculas: %zu\\n", contar(texto, islower));
    printf("Digitos: %zu\\n", contar(texto, isdigit));
    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Mayusculas: 2\nMinusculas: 7\nDigitos: 3\n', description: 'Debe contar 2 mayúsculas, 7 minúsculas y 3 dígitos' }
              ],
              hints: [
                'La firma es: size_t contar(const char *s, int (*f)(int))',
                'Recorré la cadena y llamá a f(*c) para cada caracter.',
                'Si f devuelve distinto de 0, incrementá el contador.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'debugging',
    title: 'Herramientas de debugging',
    description: 'printf debugging, assert, GDB y Valgrind.',
    icon: 'Bug',
    difficulty: 'Avanzado',
    prerequisites: ['memoria'],
    lessons: [
      {
        id: 'debug-tools',
        title: 'Debugging en C',
        description: 'printf, assert, GDB y Valgrind',
        content: {
          theory: `
<h2>Herramientas de debugging</h2>
<h3>Objetivos</h3>
<ul>
<li>Usar <code>printf</code> para debuggear</li>
<li>Usar <code>assert</code> para verificar invariantes</li>
<li>Conocer GDB y Valgrind</li>
</ul>

<h3>printf debugging</h3>
<p>La técnica más simple: agregar <code>printf</code> para ver el estado del programa:</p>
<pre><code class="language-c">printf("DEBUG: x = %d, y = %d\\n", x, y);</code></pre>

<h3>assert</h3>
<pre><code class="language-c">#include &lt;assert.h&gt;
assert(n &gt; 0);  // si n <= 0, el programa aborta con un mensaje</code></pre>

<h3>GDB (GNU Debugger)</h3>
<p>Compilar con <code>-g</code>, luego:</p>
<pre><code class="language-bash">$ gdb -tui ./programa
(gdb) break main     # agregar breakpoint
(gdb) run            # ejecutar
(gdb) next           # siguiente línea
(gdb) print x        # ver valor de x
(gdb) backtrace      # ver stack de funciones</code></pre>

<h3>Valgrind</h3>
<p>Detecta errores de memoria (leaks, reads de memoria no inicializada, etc.):</p>
<pre><code class="language-bash">$ valgrind --leak-check=full ./programa</code></pre>`,
          exercises: [
            {
              id: 'debug-1',
              title: 'Encontrar el memory leak',
              instruction: 'Este programa tiene un memory leak. Encontralo y corregilo.',
              type: 'fix-logic',
              difficulty: 'medio',
              starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *crear_saludo(const char *nombre) {
    char *saludo = malloc(strlen(nombre) + 10);
    if (saludo == NULL) return NULL;
    sprintf(saludo, "Hola %s!", nombre);
    return saludo;
}

int main(void) {
    char *s1 = crear_saludo("Ana");
    printf("%s\\n", s1);

    char *s2 = crear_saludo("Bob");
    printf("%s\\n", s2);

    return 0;
}`,
              solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *crear_saludo(const char *nombre) {
    char *saludo = malloc(strlen(nombre) + 10);
    if (saludo == NULL) return NULL;
    sprintf(saludo, "Hola %s!", nombre);
    return saludo;
}

int main(void) {
    char *s1 = crear_saludo("Ana");
    printf("%s\\n", s1);
    free(s1);

    char *s2 = crear_saludo("Bob");
    printf("%s\\n", s2);
    free(s2);

    return 0;
}`,
              testCases: [
                { input: '', expectedOutput: 'Hola Ana!\nHola Bob!\n', description: 'Debe imprimir los saludos y liberar la memoria' }
              ],
              hints: [
                'La función crear_saludo usa malloc para crear la cadena en el heap.',
                'Todo lo que se reserva con malloc debe liberarse con free.',
                'Falta free(s1) y free(s2) en main.'
              ]
            }
          ]
        }
      }
    ]
  },
];
