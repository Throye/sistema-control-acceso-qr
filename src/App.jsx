import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './App.css'
import { Html5QrcodeScanner } from 'html5-qrcode'

const menuItems = [
  { id: 'dashboard', icon: '▦', label: 'Dashboard' },
  { id: 'usuarios', icon: '♙', label: 'Usuarios' },
  { id: 'qr', icon: '▦', label: 'Códigos QR' },
  { id: 'escaner', icon: '▣', label: 'Escáner QR' },
  { id: 'historial', icon: '◷', label: 'Historial de accesos' },
]

const accesosDemo = [
  { nombre: 'Juan Pérez', hora: '09:15', fecha: '22/11/2026', estado: 'Autorizado' },
  { nombre: 'María González', hora: '09:08', fecha: '22/11/2026', estado: 'Autorizado' },
  { nombre: 'Pedro Soto', hora: '08:52', fecha: '22/11/2026', estado: 'Rechazado' },
  { nombre: 'Ana Martínez', hora: '08:30', fecha: '22/11/2026', estado: 'Autorizado' },
]

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const [accesos, setAccesos] = useState(() => {
    const guardados = localStorage.getItem('historialAccesos')
    return guardados ? JSON.parse(guardados) : accesosDemo
  })
  useEffect(() => {
    localStorage.setItem('historialAccesos', JSON.stringify(accesos))
  }, [accesos])
  const activeItem = menuItems.find(
    (item) => item.id === activeSection
  )

  return (
    <div className="app-container">

      {/* MENÚ LATERAL */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">AC</div>
          <div>
            <h2>AccessControl</h2>
            <span>Sistema inteligente</span>
          </div>
        </div>

        <div className="menu-title">MENÚ PRINCIPAL</div>

        <nav className="navigation">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''
                }`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">AD</div>
          <div>
            <strong>Administrador</strong>
            <span>Panel administrativo</span>
          </div>
        </div>

      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <span className="breadcrumb">Sistema / {activeItem.label}</span>
          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            Interfaz de demostración
          </div>
        </header>

        <section className="page-content">

          <div className="welcome-section">
            <div>
              <span className="section-label">PANEL DE CONTROL</span>
              <h1>{activeItem.label}</h1>
              <p>
                Bienvenido al sistema de control de acceso.
                Administra y supervisa los accesos desde aquí.
              </p>
            </div>
          </div>

          {activeSection === 'dashboard' ? (
            <Dashboard />
          ) : activeSection === 'usuarios' ? (
            <UsuariosPage />
          ) : activeSection === 'qr' ? (
            <QRPage />
          ) : activeSection === 'escaner' ? (
            <EscanerPage setAccesos={setAccesos} />
          ) : activeSection === 'historial' ? (
            <HistorialPage accesos={accesos} />
          ) : (
            <ModulePage section={activeSection} />
          )}

        </section>

      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      {/* TARJETAS INFORMATIVAS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">♙</div>
          <span>Total de usuarios</span>
          <h2>120</h2>
          <small>Datos de demostración</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <span>Accesos autorizados</span>
          <h2>85</h2>
          <small>Datos de demostración</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">▣</div>
          <span>Códigos QR</span>
          <h2>100</h2>
          <small>Datos de demostración</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <span>Accesos rechazados</span>
          <h2>5</h2>
          <small>Datos de demostración</small>
        </div>

      </div>

      {/* TABLA DE ACTIVIDAD */}
      <div className="activity-card">

        <div className="activity-header">
          <div>
            <h2>Actividad reciente</h2>
            <p>Últimos registros de acceso de ejemplo</p>
          </div>

          <span className="activity-tag">Historial</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {accesosDemo.map((acceso, index) => (
                <tr key={index}>
                  <td>
                    <strong>{acceso.nombre}</strong>
                  </td>
                  <td>{acceso.fecha}</td>
                  <td>{acceso.hora}</td>
                  <td>
                    <span
                      className={`badge ${acceso.estado === 'Autorizado'
                        ? 'approved'
                        : 'rejected'
                        }`}
                    >
                      {acceso.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="demo-note">
          Los registros y cantidades mostrados son ficticios.
          Posteriormente se conectarán con el Backend.
        </p>

      </div>
    </>
  )
}


function UsuariosPage() {
  const [busqueda, setBusqueda] = useState('')

  const usuarios = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      correo: 'juan@email.com',
      tipo: 'Residente',
      estado: 'Activo',
    },
    {
      id: 2,
      nombre: 'María González',
      correo: 'maria@email.com',
      tipo: 'Administrador',
      estado: 'Activo',
    },
    {
      id: 3,
      nombre: 'Pedro Soto',
      correo: 'pedro@email.com',
      tipo: 'Visitante',
      estado: 'Inactivo',
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      correo: 'ana@email.com',
      tipo: 'Residente',
      estado: 'Activo',
    },
  ]

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nombre} ${usuario.correo} ${usuario.tipo}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  return (
    <div className="users-card">

      <div className="users-header">
        <div>
          <h2>Usuarios registrados</h2>
          <p>Consulta y administra los usuarios del sistema.</p>
        </div>

        <span className="users-count">
          {usuarios.length} usuarios
        </span>
      </div>

      <div className="users-search">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Buscar por nombre, correo o tipo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Tipo de usuario</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td><strong>{usuario.nombre}</strong></td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.tipo}</td>
                  <td>
                    <span
                      className={`badge ${usuario.estado === 'Activo'
                        ? 'approved'
                        : 'rejected'
                        }`}
                    >
                      {usuario.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="demo-note">
        Usuarios ficticios para pruebas de interfaz.
        Posteriormente se obtendrán desde el Backend.
      </p>

    </div>
  )
}


function QRPage() {
  const [nombre, setNombre] = useState('')
  const [identificador, setIdentificador] = useState('')
  const [codigoGenerado, setCodigoGenerado] = useState('')

  const generarQR = () => {
    if (!nombre.trim() || !identificador.trim()) {
      alert('Completa el nombre y el identificador del usuario.')
      return
    }

    setCodigoGenerado(identificador.trim())
  }

  const descargarQR = () => {
    const svg = document.getElementById('user-qr')

    if (!svg) return

    const contenido = new XMLSerializer().serializeToString(svg)
    const archivo = new Blob(
      [contenido],
      { type: 'image/svg+xml;charset=utf-8' }
    )

    const url = URL.createObjectURL(archivo)
    const enlace = document.createElement('a')

    enlace.href = url
    enlace.download = `codigo-QR-${codigoGenerado}.svg`
    enlace.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="qr-layout">

      <div className="qr-form-card">
        <h2>Generar código QR</h2>
        <p>Ingresa los datos del usuario para crear su código.</p>

        <div className="form-group">
          <label>Nombre del usuario</label>
          <input
            type="text"
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Identificador del usuario</label>
          <input
            type="text"
            placeholder="Ej. USR001"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
          />
        </div>

        <button className="generate-button" onClick={generarQR}>
          Generar código QR
        </button>
      </div>

      <div className="qr-preview-card">
        <h2>Vista previa</h2>
        <p>El código QR aparecerá aquí.</p>

        {codigoGenerado ? (
          <>
            <div className="qr-image">
              <QRCodeSVG
                id="user-qr"
                value={`ACCESO:${codigoGenerado}`}
                size={190}
                level="H"
              />
            </div>

            <h3>{nombre}</h3>
            <span className="qr-user-id">
              Identificador: {codigoGenerado}
            </span>

            <button
              className="download-button"
              onClick={descargarQR}
            >
              Descargar código QR
            </button>
          </>
        ) : (
          <div className="qr-empty">
            <span>▦</span>
            <p>Esperando generación del código</p>
          </div>
        )}
      </div>

    </div>
  )
}

function EscanerPage({ setAccesos }) {
  const [resultado, setResultado] = useState('')
  const [estado, setEstado] = useState('Esperando escaneo')

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 220, height: 220 },
        rememberLastUsedCamera: true,
      },
      false
    )

   
scanner.render(
  (textoLeido) => {
    setResultado(textoLeido)

    const reconocido = textoLeido.startsWith('ACCESO:')
    const identificador = reconocido
      ? textoLeido.replace('ACCESO:', '')
      : textoLeido

    setEstado(
      reconocido ? 'Código reconocido' : 'Código no reconocido'
    )

    const ahora = new Date()

    const nuevoAcceso = {
      nombre: reconocido
        ? `Usuario ${identificador}`
        : 'Usuario no identificado',
      identificador: identificador,
      fecha: ahora.toLocaleDateString('es-CL'),
      hora: ahora.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      estado: reconocido ? 'Reconocido' : 'Rechazado',
    }

    setAccesos((previos) => [
      nuevoAcceso,
      ...previos,
    ])

    scanner.clear().catch(() => {})
  },
  () => {}
)


    return () => {
      scanner.clear().catch(() => { })
    }
  }, [])

  return (
    <div className="scanner-layout">

      <div className="scanner-card">
        <h2>Escáner de códigos QR</h2>

        <p>
          Utiliza la cámara para leer el código QR de un usuario.
        </p>

        <div id="qr-reader"></div>

        <div className="scanner-instructions">
          Centra el código QR dentro del recuadro de lectura.
        </div>
      </div>

      <div className="scanner-result-card">
        <h2>Resultado del escaneo</h2>

        <div className="scan-status">
          <span className="status-dot"></span>
          {estado}
        </div>

        {resultado ? (
          <div className="scan-result">
            <span className="result-label">Contenido leído</span>

            <h3>{resultado}</h3>

            <div className={
              resultado.startsWith('ACCESO:')
                ? 'scan-approved'
                : 'scan-rejected'
            }>
              {resultado.startsWith('ACCESO:')
                ? 'Formato de acceso reconocido'
                : 'Formato de código no reconocido'}
            </div>
          </div>
        ) : (
          <div className="scanner-empty">
            <span>▣</span>
            <p>Esperando lectura del código QR</p>
          </div>
        )}

        <p className="demo-note">
          Esta validación es una demostración visual.
          La autorización real dependerá del Backend.
        </p>
      </div>

    </div>
  )
}

function ModulePage({ section }) {
  const descriptions = {
    usuarios: 'Aquí podremos visualizar y administrar los usuarios registrados.',
    qr: 'Aquí podremos generar y visualizar los códigos QR de los usuarios.',
    escaner: 'Aquí prepararemos la interfaz para escanear códigos QR mediante la cámara.',
    historial: 'Aquí podremos consultar los registros de entradas y salidas.',
  }

  return (
    <div className="module-card">
      <div className="module-icon">▦</div>
      <h2>{menuItems.find((item) => item.id === section)?.label}</h2>
      <p>{descriptions[section]}</p>
      <span className="coming-soon">Módulo en desarrollo</span>
    </div>
  )
}

function HistorialPage({ accesos }) {
  return (
    <div className="activity-card">

      <div className="activity-header">
        <div>
          <h2>Historial de accesos</h2>
          <p>Registro de entradas y validaciones del sistema.</p>
        </div>

        <span className="activity-tag">
          {accesos.length} registros
        </span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {accesos.length > 0 ? (
              accesos.map((acceso, index) => (
                <tr key={index}>
                  <td>
                    <strong>{acceso.nombre}</strong>
                  </td>

                  <td>{acceso.fecha}</td>
                  <td>{acceso.hora}</td>

                  <td>
                    <span className={`badge ${acceso.estado === 'Autorizado' ||
                      acceso.estado === 'Reconocido'
                      ? 'approved'
                      : 'rejected'
                      }`}>
                      {acceso.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  No existen registros de acceso.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="demo-note">
        Historial temporal almacenado en React.
        Posteriormente se conectará con la base de datos.
      </p>

    </div>
  )
}

export default App