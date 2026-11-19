import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Tema general de la aplicación.
 * Todas las pantallas deben usar estos colores, textos y componentes base
 * para mantener un estilo visual consistente.
 */

export const COLORES = {
  // Base
  fondo: '#450a0a',
  superficie: '#fff7f5',
  borde: '#fecaca',
  acento: '#b91c1c',
  texto: '#450a0a',
  textoSecundario: '#7f1d1d',
  blanco: '#ffffff',
  sombra: '#1f0000',
  sombraBoton: '#7f1d1d',

  // Velos claros para usar sobre el fondo oscuro
  velo: 'rgba(255, 247, 245, 0.08)',
  veloFuerte: 'rgba(255, 247, 245, 0.2)',

  // Estados
  exito: '#15803d',
  exitoFondo: '#dcfce7',
  exitoTexto: '#14532d',
  advertencia: '#b45309',
  advertenciaFondo: '#fef3c7',
  error: '#b91c1c',
  errorFondo: '#fee2e2',
  errorTexto: '#7f1d1d',

  // Otros
  estrella: '#ca8a04',
  placeholderFondo: '#E5E7EB',
  placeholderTexto: '#6B7280',
};

/** Estilos de texto reutilizables */
export const TEXTOS = StyleSheet.create({
  etiqueta: {
    color: COLORES.acento,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  titulo: {
    color: COLORES.texto,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitulo: {
    color: COLORES.textoSecundario,
    fontSize: 15,
    marginTop: 4,
  },
  seccion: {
    color: COLORES.texto,
    fontSize: 16,
    fontWeight: '700',
  },
  cuerpo: {
    color: COLORES.texto,
    fontSize: 15,
    lineHeight: 22,
  },
  pequeno: {
    color: COLORES.textoSecundario,
    fontSize: 12,
  },
  precio: {
    color: COLORES.exito,
    fontSize: 17,
    fontWeight: '800',
  },
  // Para textos escritos directamente sobre el fondo oscuro de la pantalla
  tituloSobreFondo: {
    color: COLORES.superficie,
    fontSize: 26,
    fontWeight: '800',
  },
  subtituloSobreFondo: {
    color: COLORES.borde,
    fontSize: 14,
    marginTop: 4,
  },
});

/** Opciones de cabecera para el navegador (Stack.Navigator screenOptions) */
export const OPCIONES_CABECERA = {
  headerStyle: { backgroundColor: COLORES.fondo },
  headerTintColor: COLORES.superficie,
  headerTitleStyle: { fontWeight: '700' },
  contentStyle: { backgroundColor: COLORES.fondo },
};

/** Contenedor de pantalla completa con el fondo del tema */
export function Pantalla({ children, style, centrado = false }) {
  return (
    <View style={[styles.pantalla, centrado && styles.centrado, style]}>{children}</View>
  );
}

/** Tarjeta clara con borde y sombra */
export function Tarjeta({ children, style }) {
  return <View style={[styles.tarjeta, style]}>{children}</View>;
}

/**
 * Bloque de encabezado: etiqueta pequeña + título + subtítulo.
 * - centrado: centra los textos
 * - sobreFondo: usa colores claros para escribir sobre el fondo oscuro
 */
export function Encabezado({ etiqueta, titulo, subtitulo, centrado = false, sobreFondo = false, style }) {
  const alineacion = centrado && styles.textoCentrado;
  return (
    <View style={[centrado && styles.encabezadoCentrado, style]}>
      {etiqueta ? <Text style={[TEXTOS.etiqueta, styles.encabezadoEtiqueta]}>{etiqueta}</Text> : null}
      {titulo ? (
        <Text style={[sobreFondo ? TEXTOS.tituloSobreFondo : TEXTOS.titulo, alineacion]}>{titulo}</Text>
      ) : null}
      {subtitulo ? (
        <Text style={[sobreFondo ? TEXTOS.subtituloSobreFondo : TEXTOS.subtitulo, alineacion]}>
          {subtitulo}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Botón del tema.
 * variante: 'primario' (relleno) | 'secundario' (contorno)
 * compacto: versión pequeña que solo ocupa el ancho de su texto
 */
export function Boton({ titulo, onPress, variante = 'primario', compacto = false, style, textStyle, ...props }) {
  const esSecundario = variante === 'secundario';
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.boton,
        esSecundario && styles.botonSecundario,
        compacto && styles.botonCompacto,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.botonTexto,
          esSecundario && styles.botonTextoSecundario,
          compacto && styles.botonTextoCompacto,
          textStyle,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

/** Pequeña etiqueta destacada (categorías, estados, etc.) */
export function Insignia({ texto, style, textStyle }) {
  return (
    <View style={[styles.insignia, style]}>
      <Text style={[styles.insigniaTexto, textStyle]} numberOfLines={1}>
        {texto}
      </Text>
    </View>
  );
}

/** Foto circular con texto de reemplazo cuando no hay imagen */
export function Avatar({ uri, tamano = 120, grosorBorde = 4, style, accessibilityLabel }) {
  const forma = {
    width: tamano,
    height: tamano,
    borderRadius: tamano / 2,
    borderWidth: grosorBorde,
  };
  return (
    <View style={[styles.avatar, forma, style]}>
      {uri ? (
        <Image source={{ uri }} style={styles.avatarImagen} accessibilityLabel={accessibilityLabel} />
      ) : (
        <Text style={styles.avatarTexto}>Sin foto</Text>
      )}
    </View>
  );
}

/** Calificación con estrella: "★ 4.5 (120)" */
export function Calificacion({ valor, cantidad, sufijo = '', style }) {
  return (
    <View style={[styles.calificacion, style]}>
      <Text style={styles.calificacionEstrella}>★</Text>
      <Text style={styles.calificacionValor}>{valor}</Text>
      {cantidad !== undefined && (
        <Text style={styles.calificacionCantidad}>
          ({cantidad}
          {sufijo ? ` ${sufijo}` : ''})
        </Text>
      )}
    </View>
  );
}

/** Precio formateado con dos decimales */
export function Precio({ valor, style }) {
  return <Text style={[TEXTOS.precio, style]}>${Number(valor).toFixed(2)}</Text>;
}

/** Pantalla de carga */
export function Cargando({ mensaje = 'Cargando...' }) {
  return (
    <Pantalla centrado>
      <ActivityIndicator size="large" color={COLORES.superficie} />
      <Text style={styles.mensajeCarga}>{mensaje}</Text>
    </Pantalla>
  );
}

/** Pantalla de error con botón de acción opcional */
export function MensajeError({ titulo = 'Algo salió mal', mensaje, textoBoton, onPress }) {
  return (
    <Pantalla centrado>
      <Tarjeta style={styles.centrarContenido}>
        <Encabezado titulo={titulo} subtitulo={mensaje} centrado style={styles.errorEncabezado} />
        {textoBoton && onPress ? <Boton titulo={textoBoton} onPress={onPress} /> : null}
      </Tarjeta>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  centrado: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  centrarContenido: {
    alignItems: 'center',
  },
  tarjeta: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORES.superficie,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORES.borde,
    padding: 24,
    shadowColor: COLORES.sombra,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
  },
  encabezadoCentrado: {
    alignItems: 'center',
  },
  encabezadoEtiqueta: {
    marginBottom: 8,
  },
  textoCentrado: {
    textAlign: 'center',
  },
  boton: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORES.acento,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: COLORES.sombraBoton,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  botonSecundario: {
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.acento,
    elevation: 0,
    shadowOpacity: 0,
  },
  botonCompacto: {
    width: 'auto',
    minHeight: 36,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  botonTexto: {
    color: COLORES.blanco,
    fontSize: 16,
    fontWeight: '600',
  },
  botonTextoSecundario: {
    color: COLORES.acento,
  },
  botonTextoCompacto: {
    fontSize: 13,
  },
  insignia: {
    alignSelf: 'flex-start',
    backgroundColor: COLORES.borde,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  insigniaTexto: {
    color: COLORES.acento,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  avatar: {
    overflow: 'hidden',
    borderColor: COLORES.borde,
    backgroundColor: COLORES.placeholderFondo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImagen: {
    width: '100%',
    height: '100%',
  },
  avatarTexto: {
    color: COLORES.placeholderTexto,
    fontSize: 14,
    fontWeight: '600',
  },
  calificacion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calificacionEstrella: {
    color: COLORES.estrella,
    fontSize: 13,
    marginRight: 3,
  },
  calificacionValor: {
    color: COLORES.texto,
    fontSize: 12,
    fontWeight: '700',
  },
  calificacionCantidad: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    marginLeft: 4,
  },
  mensajeCarga: {
    color: COLORES.borde,
    fontSize: 14,
    marginTop: 12,
  },
  errorEncabezado: {
    marginBottom: 16,
  },
});
