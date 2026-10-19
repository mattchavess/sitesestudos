// c = índice da resposta correta (0=A, 1=B, 2=C, 3=D)
const TOPICOS=[
{nome:"IoT",titulo:"Internet das Coisas (IoT)",teoria:`
<p><b>IoT</b> é a rede de objetos físicos (“coisas”) com sensores, processamento e conexão à internet, que coletam e trocam dados sem intervenção humana constante. Exemplos: casa inteligente, agricultura de precisão, relógios fitness, cidades inteligentes, indústria 4.0.</p>
<p><b>Arquitetura em camadas:</b></p>
<ul><li><b>Percepção:</b> sensores e atuadores que lidam com o mundo físico.</li><li><b>Rede (transporte):</b> leva o dado: Wi-Fi, Bluetooth/BLE, Zigbee, LoRa, 4G/5G.</li><li><b>Aplicação:</b> nuvem, banco de dados, dashboards e apps.</li></ul>
<p><b>Protocolos importantes:</b></p>
<table><tr><th>Protocolo</th><th>Característica</th></tr>
<tr><td>MQTT</td><td>Leve, modelo <i>publish/subscribe</i> com um <i>broker</i> intermediário. Ideal para IoT.</td></tr>
<tr><td>HTTP/REST</td><td>Requisição/resposta, mais pesado. Usa JSON.</td></tr>
<tr><td>CoAP</td><td>Parecido com HTTP, porém leve, sobre UDP.</td></tr>
<tr><td>LoRa</td><td>Longo alcance e baixo consumo, baixa taxa de dados.</td></tr>
<tr><td>Bluetooth LE</td><td>Curto alcance, baixíssimo consumo.</td></tr></table>
<p><b>Computação em nuvem x borda (edge):</b> na borda o dado é processado perto do dispositivo (menor latência); na nuvem há mais poder de processamento e armazenamento.</p>
<p class="dica"><b>Segurança:</b> senhas padrão, firmware desatualizado e falta de criptografia são as maiores falhas em IoT. Use senhas fortes, atualizações e TLS.</p>`,
questoes:[
{p:"Qual protocolo usa o modelo publish/subscribe com um broker e é muito usado em IoT?",o:["HTTP","MQTT","FTP","SMTP"],c:1,e:"O MQTT é leve e usa broker: dispositivos publicam em tópicos e outros assinam."},
{p:"Qual camada da IoT é responsável por coletar dados do ambiente físico?",o:["Aplicação","Rede","Percepção","Nuvem"],c:2,e:"A camada de percepção reúne sensores e atuadores."},
{p:"Qual tecnologia é a mais indicada para sensores no campo, longe de tudo, com bateria durando anos?",o:["LoRa","Wi-Fi","Ethernet","HDMI"],c:0,e:"LoRa tem longo alcance e baixo consumo, mas taxa de dados baixa."},
{p:"Processar dados perto do dispositivo para reduzir a latência é chamado de:",o:["Cloud computing","Edge computing","Cache DNS","Streaming"],c:1,e:"Edge computing (computação de borda) processa localmente, sem depender sempre da nuvem."}]},

{nome:"Sensores e atuadores",titulo:"Sensores e atuadores",teoria:`
<p><b>Sensor</b> converte uma grandeza física (temperatura, luz, distância, movimento) em sinal elétrico. <b>Atuador</b> faz o contrário: recebe um sinal e age no mundo físico (liga, move, acende).</p>
<table><tr><th>Componente</th><th>Tipo</th><th>Mede/faz</th></tr>
<tr><td>DHT11 / DHT22</td><td>Sensor digital</td><td>Temperatura e umidade</td></tr>
<tr><td>LM35 / termistor NTC</td><td>Sensor analógico</td><td>Temperatura</td></tr>
<tr><td>LDR</td><td>Sensor analógico</td><td>Luminosidade (resistência cai com mais luz)</td></tr>
<tr><td>HC-SR04</td><td>Sensor digital</td><td>Distância por ultrassom</td></tr>
<tr><td>PIR</td><td>Sensor digital</td><td>Presença/movimento (infravermelho)</td></tr>
<tr><td>LED, buzzer, servo, relé, motor</td><td>Atuadores</td><td>Luz, som, posição, chaveamento, rotação</td></tr></table>
<p><b>Digital x analógico:</b> o sinal digital tem 2 níveis (0 ou 1, LOW ou HIGH). O analógico varia continuamente. O <b>ADC</b> converte analógico em digital. Em um ADC de 10 bits (Arduino Uno) o valor vai de <b>0 a 1023</b>; no ESP32 (12 bits), de 0 a 4095.</p>
<p><b>PWM</b> (modulação por largura de pulso) simula uma saída analógica variando o tempo em HIGH. Controla brilho de LED e velocidade de motor.</p>
<p><b>Lei de Ohm:</b> V = R × I. Um relé permite que um microcontrolador de 5 V comande cargas maiores, como lâmpadas de 127/220 V.</p>
<p class="dica">Distância com HC-SR04: <code>distância = (tempo × 0,034) / 2</code> em cm, porque o som vai e volta.</p>`,
questoes:[
{p:"Qual componente é um ATUADOR?",o:["LDR","PIR","Servo motor","DHT11"],c:2,e:"O servo motor age no ambiente movendo um eixo. Os demais são sensores."},
{p:"Um sensor LDR mede:",o:["Temperatura","Luminosidade","Distância","Umidade"],c:1,e:"LDR é um resistor dependente de luz."},
{p:"Um ADC de 10 bits fornece valores de:",o:["0 a 255","0 a 1023","0 a 4095","0 a 1000"],c:1,e:"2¹⁰ = 1024 valores, de 0 a 1023."},
{p:"Qual técnica permite variar o brilho de um LED usando saída digital?",o:["ADC","I2C","PWM","SPI"],c:2,e:"PWM varia a proporção do tempo em HIGH, mudando a potência média."}]},

{nome:"Arduino / ESP32",titulo:"Arduino, ESP32 e Raspberry Pi",teoria:`
<p><b>Arduino Uno:</b> microcontrolador ATmega328P, 5 V, 14 pinos digitais, 6 analógicos. Programado em C/C++. <b>ESP32:</b> 3,3 V, Wi-Fi e Bluetooth integrados, ótimo para IoT. <b>Raspberry Pi:</b> computador completo com Linux (não é microcontrolador), roda Python, Java etc.</p>
<p>Todo programa Arduino tem duas funções: <code>setup()</code>, executada <b>uma vez</b>, e <code>loop()</code>, repetida <b>infinitamente</b>.</p>
<pre>int led = 13;
void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}
void loop() {
  digitalWrite(led, HIGH);
  delay(1000);          // 1 segundo
  digitalWrite(led, LOW);
  delay(1000);
  int luz = analogRead(A0);
  Serial.println(luz);
}</pre>
<p><b>Funções-chave:</b> <code>pinMode</code> (define entrada/saída), <code>digitalRead/Write</code>, <code>analogRead</code> (0–1023), <code>analogWrite</code> (PWM, 0–255), <code>delay</code> (ms).</p>
<p><b>Comunicação entre chips:</b> <b>UART</b> (serial, 2 fios TX/RX), <b>I2C</b> (2 fios SDA/SCL, vários dispositivos por endereço), <b>SPI</b> (4 fios, mais rápido).</p>
<p class="dica">Cálculo do resistor do LED: R = (Vfonte − Vled) / I. Ex.: (5 − 2) / 0,02 = <b>150 Ω</b>.</p>`,
questoes:[
{p:"Qual função do Arduino roda apenas uma vez, no início?",o:["loop()","main()","setup()","start()"],c:2,e:"setup() é executada uma vez; loop() repete para sempre."},
{p:"O que o comando delay(2000) faz?",o:["Espera 2 segundos","Espera 2 milissegundos","Espera 20 segundos","Desliga o pino 2"],c:0,e:"delay recebe milissegundos: 2000 ms = 2 s."},
{p:"Qual placa tem Wi-Fi e Bluetooth integrados?",o:["Arduino Uno","ESP32","Resistor","ATmega328P sozinho"],c:1,e:"O ESP32 já vem com Wi-Fi e Bluetooth, por isso é popular em IoT."},
{p:"Um LED de 2 V será ligado a 5 V com corrente de 20 mA. O resistor adequado é:",o:["50 Ω","100 Ω","150 Ω","350 Ω"],c:2,e:"R = (5 − 2) / 0,02 = 150 Ω."}]},

{nome:"Java",titulo:"Java e Programação Orientada a Objetos",teoria:`
<p>Java é uma linguagem <b>compilada para bytecode</b>, executado pela <b>JVM</b> (Java Virtual Machine). Por isso é portável: “escreva uma vez, rode em qualquer lugar”. É fortemente tipada e orientada a objetos.</p>
<p><b>Tipos primitivos:</b> <code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code>, <code>long</code>, <code>float</code>, <code>byte</code>, <code>short</code>. <code>String</code> é uma classe, não primitivo. Divisão de inteiros descarta a parte decimal: <code>7 / 2 = 3</code>, e <code>7 % 2 = 1</code>.</p>
<pre>public class Sensor {
  private String nome;           // encapsulamento
  private double valor;
  public Sensor(String nome) { this.nome = nome; }
  public double getValor() { return valor; }
  public void setValor(double v) {
    if (v &gt;= 0) valor = v;
  }
}
// uso:
Sensor s = new Sensor("DHT11");
s.setValor(25.5);

for (int i = 0; i &lt; 5; i++) { System.out.println(i); }
int[] v = {3, 5, 8};   // v.length = 3, índice começa em 0</pre>
<p><b>Os 4 pilares da POO:</b></p>
<ul><li><b>Encapsulamento:</b> atributos <code>private</code> acessados por getters/setters.</li><li><b>Herança:</b> <code>class Termometro extends Sensor</code>.</li><li><b>Polimorfismo:</b> mesmo método, comportamentos diferentes (sobrescrita com <code>@Override</code>).</li><li><b>Abstração:</b> classes <code>abstract</code> e <code>interface</code>.</li></ul>
<p><b>Outros pontos:</b> <code>==</code> compara referências em objetos; use <code>.equals()</code> para comparar Strings. Exceções: <code>try { } catch (Exception e) { } finally { }</code>. O ponto de entrada é <code>public static void main(String[] args)</code>. Construtor tem o nome da classe e não tem retorno.</p>`,
questoes:[
{p:"Qual o resultado de int x = 7 / 2; em Java?",o:["3.5","4","3","3.0"],c:2,e:"Divisão entre inteiros resulta em inteiro: 3."},
{p:"Qual pilar da POO esconde os atributos e os expõe por getters e setters?",o:["Herança","Polimorfismo","Encapsulamento","Abstração"],c:2,e:"Encapsulamento protege o estado interno do objeto."},
{p:"Como comparar corretamente o conteúdo de duas Strings?",o:["a == b","a.equals(b)","a = b","a.compare(b)"],c:1,e:"== compara referências; equals compara o texto."},
{p:"Qual palavra-chave indica que uma classe herda de outra?",o:["implements","inherits","extends","super"],c:2,e:"extends faz herança de classe; implements é para interfaces."}]},

{nome:"Lógica e binário",titulo:"Lógica de programação e sistemas numéricos",teoria:`
<p><b>Algoritmo</b> é uma sequência finita e ordenada de passos para resolver um problema. Estruturas básicas: <b>sequência</b>, <b>decisão</b> (if/else) e <b>repetição</b> (for, while).</p>
<p><b>Operadores lógicos:</b> E (<code>&amp;&amp;</code>), OU (<code>||</code>), NÃO (<code>!</code>).</p>
<table><tr><th>A</th><th>B</th><th>A E B</th><th>A OU B</th><th>NÃO A</th></tr>
<tr><td>V</td><td>V</td><td>V</td><td>V</td><td>F</td></tr><tr><td>V</td><td>F</td><td>F</td><td>V</td><td>F</td></tr>
<tr><td>F</td><td>V</td><td>F</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td>V</td></tr></table>
<p><b>Binário:</b> cada posição vale uma potência de 2 (…8, 4, 2, 1). Ex.: 1011₂ = 8 + 2 + 1 = <b>11</b>. Para converter decimal em binário, divida por 2 e leia os restos de baixo para cima. <b>Hexadecimal</b> usa 0–9 e A–F (A=10 … F=15): FF₁₆ = 255.</p>
<p><b>Unidades:</b> 1 byte = 8 bits; 1 KB = 1024 bytes. <b>Teste de mesa:</b> acompanhar o valor das variáveis linha a linha para prever a saída.</p>
<pre>soma = 0
para i de 1 até 4:
    soma = soma + i
// soma = 1+2+3+4 = 10</pre>`,
questoes:[
{p:"Quanto vale 1011 em binário no sistema decimal?",o:["9","10","11","13"],c:2,e:"8 + 0 + 2 + 1 = 11."},
{p:"A expressão (V E F) OU V resulta em:",o:["Verdadeiro","Falso","Erro","Indefinido"],c:0,e:"V E F = F; F OU V = V."},
{p:"No exemplo da soma de 1 até 4, qual o valor final de soma?",o:["4","6","10","24"],c:2,e:"1 + 2 + 3 + 4 = 10."},
{p:"O número hexadecimal FF equivale, em decimal, a:",o:["15","155","255","256"],c:2,e:"F = 15; 15 × 16 + 15 = 255."}]},

{nome:"Redes e dados",titulo:"Redes, segurança e banco de dados",teoria:`
<p><b>Modelo TCP/IP (camadas):</b> Aplicação (HTTP, DNS, MQTT) → Transporte (TCP, UDP) → Internet (IP) → Acesso à rede (Ethernet, Wi-Fi).</p>
<ul><li><b>TCP:</b> confiável, orientado à conexão, confirma entrega (web, e-mail).</li><li><b>UDP:</b> rápido, sem garantia (vídeo, jogos, CoAP).</li><li><b>IP:</b> endereça dispositivos. IPv4 tem 32 bits (ex.: 192.168.0.10); IPv6 tem 128 bits.</li><li><b>DNS:</b> traduz nomes (site.com) em IPs. <b>DHCP:</b> distribui IPs automaticamente.</li><li><b>Portas comuns:</b> HTTP 80, HTTPS 443, SSH 22, MQTT 1883 (8883 com TLS).</li><li><b>Roteador</b> liga redes diferentes; <b>switch</b> conecta dispositivos na mesma rede.</li></ul>
<p><b>Segurança:</b> <b>HTTPS/TLS</b> criptografa a comunicação. Criptografia <b>simétrica</b> usa uma chave só; <b>assimétrica</b> usa par público/privado. <b>Hash</b> (SHA-256) é unidirecional e serve para integridade e senhas. <i>Phishing</i> é engano para roubar dados; <i>DDoS</i> sobrecarrega um serviço. Pilares: confidencialidade, integridade, disponibilidade.</p>
<p><b>Banco de dados (SQL):</b> dados em tabelas, com <b>chave primária</b> (identifica cada linha de forma única) e <b>chave estrangeira</b> (liga tabelas).</p>
<pre>SELECT nome, temperatura FROM leituras
WHERE temperatura &gt; 30 ORDER BY temperatura DESC;
INSERT INTO leituras (nome, temperatura) VALUES ('sala', 27.4);
UPDATE leituras SET temperatura = 28 WHERE id = 1;
DELETE FROM leituras WHERE id = 1;</pre>`,
questoes:[
{p:"Qual protocolo traduz nomes de sites em endereços IP?",o:["DHCP","DNS","FTP","ARP"],c:1,e:"DNS = Domain Name System."},
{p:"Qual porta padrão do HTTPS?",o:["21","80","443","8080"],c:2,e:"HTTPS usa 443; HTTP usa 80."},
{p:"Qual comando SQL busca dados de uma tabela?",o:["INSERT","SELECT","UPDATE","DROP"],c:1,e:"SELECT consulta; INSERT cria; UPDATE altera; DROP apaga a tabela."},
{p:"O que garante que cada linha de uma tabela seja única?",o:["Chave estrangeira","Índice de texto","Chave primária","View"],c:2,e:"A chave primária identifica univocamente cada registro."}]}
];
