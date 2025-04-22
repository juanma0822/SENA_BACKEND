-- Tabla: usuarios
CREATE TABLE usuarios (
  numero_documento VARCHAR PRIMARY KEY,
  nombres VARCHAR,
  apellidos VARCHAR,
  correo_personal VARCHAR UNIQUE,
  correo_institucional VARCHAR UNIQUE,
  contrasena TEXT,
  tipo_documento VARCHAR,
  lugar_expedicion VARCHAR,
  genero VARCHAR,
  edad INTEGER,
  departamento VARCHAR,
  municipio VARCHAR,
  direccion TEXT,
  celular VARCHAR,
  telefono_fijo VARCHAR,
  rol VARCHAR, -- aprendiz, funcionario, guarda
  activo BOOLEAN DEFAULT TRUE, -- true = activo, false = desactivado
  fecha_nacimiento DATE
);

-- Tabla: aprendices
CREATE TABLE aprendices (
  numero_documento VARCHAR PRIMARY KEY,
  programa_formacion VARCHAR,
  numero_ficha VARCHAR,
  nivelSisben VARCHAR,  -- Nueva columna
  grupoSisben INTEGER,  -- Nueva columna
  CONSTRAINT fk_aprendiz_usuario FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento)
);

-- Tabla: funcionarios
CREATE TABLE funcionarios (
  numero_documento VARCHAR PRIMARY KEY,
  cargo VARCHAR,
  area_trabajo VARCHAR,
  tipo_funcionario VARCHAR, -- planta o contratista
  CONSTRAINT fk_funcionario_usuario FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento)
);

-- Tabla: ingresos
CREATE TABLE ingresos (
  id_ingreso SERIAL PRIMARY KEY,
  numero_documento VARCHAR,
  tipo_ingreso VARCHAR, -- entrada o salida
  fecha_hora TIMESTAMP,
  CONSTRAINT fk_ingreso_usuario FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento)
);

-- Tabla: visitantes
CREATE TABLE visitantes (
  id_visitante SERIAL PRIMARY KEY,
  nombres VARCHAR,
  apellidos VARCHAR,
  tipo_documento VARCHAR,
  numero_documento VARCHAR,
  motivo TEXT,
  area_destino VARCHAR,
  fecha_hora_ingreso TIMESTAMP,
  registrado_por VARCHAR,
  CONSTRAINT fk_visitante_registrador FOREIGN KEY (registrado_por) REFERENCES usuarios(numero_documento)
);

-- Tabla: dispositivos_salida
CREATE TABLE dispositivos_salida (
  id_salida SERIAL PRIMARY KEY,
  tipo_elemento VARCHAR,
  descripcion TEXT,
  numero_documento VARCHAR,
  registrado_por VARCHAR,
  fecha_hora_salida TIMESTAMP,
  CONSTRAINT fk_salida_usuario FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento),
  CONSTRAINT fk_salida_registrador FOREIGN KEY (registrado_por) REFERENCES usuarios(numero_documento)
);

-- Tabla: llaves
CREATE TABLE llaves (
  id_llave SERIAL PRIMARY KEY,
  nombre_llave VARCHAR UNIQUE,
  descripcion TEXT
);

-- Tabla: prestamo_llaves
CREATE TABLE prestamo_llaves (
  id_prestamo SERIAL PRIMARY KEY,
  id_llave INTEGER,
  numero_documento VARCHAR,
  registrado_por VARCHAR,
  fecha_entrega TIMESTAMP,
  fecha_devolucion TIMESTAMP,
  CONSTRAINT fk_prestamo_llave FOREIGN KEY (id_llave) REFERENCES llaves(id_llave),
  CONSTRAINT fk_prestamo_usuario FOREIGN KEY (numero_documento) REFERENCES usuarios(numero_documento),
  CONSTRAINT fk_prestamo_registrador FOREIGN KEY (registrado_por) REFERENCES usuarios(numero_documento)
);
