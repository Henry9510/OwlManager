package com.owlmanager.proyecto.Controller;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

    @Controller
    public class mainController {

        // Página de inicio
        @GetMapping("/templates/index")
        public String index() {
            return "index"; // Debe corresponder a index.html en templates
        }

        // Gestión de Usuarios
        @GetMapping("/templates/nuevo-empleado")
        public String nuevo_empleado() {
            return "nuevo-empleado"; // Debe corresponder a nuevo-empleado.html
        }

        @GetMapping("/templates/lista-empleado")
        public String lista_empleado() {
            return "lista-empleado"; // Debe corresponder a lista-empleado.html
        }

        @GetMapping("/templates/registro-horas")
        public String registro_horas() {
            return "registro-horas"; // Debe corresponder a registro-horas.html
        }

        // Gestión del Inventario
        @GetMapping("/templates/nuevo-producto")
        public String nuevo_producto() {
            return "nuevo-producto"; // Debe corresponder a nuevo-producto.html
        }

        @GetMapping("/templates/lista-insumo")
        public String lista_insumo() {
            return "lista-insumo"; // Debe corresponder a lista-insumo.html
        }

        // Gestión de Proyectos
        @GetMapping("/templates/gestionProyectos")
        public String gestion_proyectos() {
            return "gestion-proyectos"; // Debe corresponder a gestion-proyectos.html
        }

        @GetMapping("/templates/nuevo-proyecto")
        public String nuevo_proyecto() {
            return "nuevo-proyecto"; // Debe corresponder a nuevo-proyecto.html
        }

        @GetMapping("/templates/recibirPedidos")
        public String recibir_pedidos() {
            return "recibir-pedidos"; // Debe corresponder a recibir-pedidos.html
        }

        @GetMapping("/templates/lista-proyectos")
        public String lista_proyectos() {
            return "lista-proyectos"; // Debe corresponder a lista-proyectos.html
        }

        // Gestión de Transferencias
        @GetMapping("/templates/transferencias")
        public String transferencias() {
            return "transferencias"; // Debe corresponder a transferencias.html
        }

        @GetMapping("/templates/transferir-almacen")
        public String transferir_almacen() {
            return "transferir-almacen"; // Debe corresponder a transferir-almacen.html
        }

        @GetMapping("/templates/transferir-proyecto")
        public String transferir_proyecto() {
            return "transferir-proyecto"; // Debe corresponder a transferir-proyecto.html
        }

        @GetMapping("/templates/lista-transferencia")
        public String lista_transferencia() {
            return "lista-transferencia"; // Debe corresponder a lista-transferencia.html
        }

        // Reportes
        @GetMapping("/templates/reportes")
        public String reportes() {
            return "reportes"; // Debe corresponder a reportes.html
        }

        // Logout
        @GetMapping("/templates/login")
        public String logout() {
            return "login"; // Debe corresponder a login.html
        }


        @GetMapping("/templates/almacen")
        public String almacen() {
            return "almacen"; // Debe corresponder a login.html
        }




        @GetMapping("/templates/lista-almacenaje")
        public String lista_almacenaje() {
            return "lista-almacenaje"; // Debe corresponder a login.html
        }

    }

