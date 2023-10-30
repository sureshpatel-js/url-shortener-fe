exports.base_url = "http://localhost:8080/";  //dev
//exports.base_url = "https://script.google.com/macros/s/AKfycbyQ47RktZ34r7H1ZA_vID-3tRffrcCSy7ARvXEDn8IchjwrtIkcSqiJzO27ewNPQH4-dg/exec"   //production
exports.SIDEBAR_MENU_ITEMS = [
    {
        name: "Dashboard",
        url: "/home/dashboard"
    },
    {
        name: "Links",
        url: "/home/links"
    }
]

exports.NON_AUTH_SIDEBAR_MENU_ITEMS = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Log in",
        url: "/login"
    },
    {
        name: "Sign up",
        url: "/signup"
    }
]
