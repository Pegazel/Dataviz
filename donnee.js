function scriptPilotes(){

d3.json("pilotes.json")
  .then(function(data) {
    let currentYear = 0;
    const svg = d3.select("svg");
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    function updateChart(yearData) {
      const colorScale = d3.scaleOrdinal()
        .domain(["Ferrari", "McLaren", "Williams", "Renault", "Honda", "Red Bull", "Brawn", "Mercedes", "Lotus"])
        .range(["#C70001", "#FF9100", "#1F54D2", "#04B0E8", "#BBBBBB", "#7A36D0", "#99D41B", "#00D0D2", "#F2CD18"]);

      // Trouver le maximum des points pour l'année en cours
      const maxPoints = d3.max(yearData.pilotes, d => d.points);
      const minHeight = 300;

      // Ajuster la hauteur du SVG en fonction du maximum des points
      const maxPointsWithImage = maxPoints + 110;
      const svgHeight = maxPointsWithImage < minHeight ? minHeight : maxPointsWithImage;

      svg.attr("height", svgHeight);

      const width = +svg.attr("width") - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;

      const g = svg.selectAll("g")
        .data([null])
        .join("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Constante pour récupérer la div où on affiche les infos sur les pilotes
      const infoDiv = d3.select(".info");
      
      const bars = g.selectAll(".bar")
        .data(yearData.pilotes);

      bars.join("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return i * (width / 3); })
        .attr("y", function(d) { return height - d.points; })
        .attr("height", function(d) { return d.points; })
        .attr("width", width / 3)
        .attr("fill", function(d) { return colorScale(d.team); })
        //Effet d'opacité
        .on("mouseover", function () {
          d3.selectAll(".bar").attr("opacity", 0.7);
          d3.select(this).attr("opacity", 1);
        })
        .on("mouseout", function () {
          d3.selectAll(".bar").attr("opacity", 1);
        })
        //Affiche info Pilotes
        .on("click", function(d,i){
          // Utilise l'index pour accéder aux données correctes
          const selectedPilote = yearData.pilotes[i];
          console.log(i)
          infoDiv.html(
            "<img src='./images/pilotes/" + i.name + "-" + i.team + ".png' alt='' id='piloteImg'>" + "<div><h3>" + i.name + "</h3><p>Points : " + i.points + "<br>Grand Prix Gagné: " + i.win_number + "</p></div>" + "<img src='./images/logo/" + i.team + ".png' alt='' id='logoImg'></img>"
          )
        });

      bars.exit().remove();

      // Ajout du numéro de rang au bas de chaque rectangle
      const text = g.selectAll(".bar-text")
        .data(yearData.pilotes);

      text.join("text")
        .attr("class", "bar-text")
        .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
        .attr("y", function(d) { return height - 10; })
        .text(function(d) { return d.rank; });

      text.exit().remove();

      // Ajout du nom du pilote au bas de chaque rectangle
      const nameText = g.selectAll(".name-text")
        .data(yearData.pilotes);

      nameText.join("text")
        .attr("class", "name-text")
        .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
        .attr("y", function(d) { return height + 20; })
        .text(function(d) { return d.name; })
        .attr("text-anchor", "middle");

      nameText.exit().remove();

      const f1Photo = g.selectAll(".f1Img")
        .data(yearData.pilotes);

      const cheminImage = "images/f1/";

      f1Photo.join("image")
        .attr("class", "f1Img")
        .attr("x", function(d, i) { return i * (width / 3) + (width / 6) - 120; })
        .attr("y", function(d) { return height - d.points - 95; })
        .attr("width", 100)
        .attr("height", 100)
        .attr("xlink:href", function(d) { return cheminImage + yearData.year + d.team + ".png"; });

      f1Photo.exit().remove();

      // Affichage de l'année actuelle
      d3.select("#currentYear").text("Année " + yearData.year);

      // Affiche les infos du pilote par défaut
      showDefaultInfo(yearData);

    }

    // Fonction pour sélectionné les données par défaut
    function showDefaultInfo(yearData) {
      const defaultPilote = yearData.pilotes.find(pilote => pilote.rank === 1);

      const infoDiv = d3.select(".info");
      infoDiv.html(
        "<img src='./images/pilotes/" + defaultPilote.name + "-" + defaultPilote.team + ".png' alt='' id='piloteImg'>" +
        "<div><h3>" + defaultPilote.name + "</h3><p>Points : " + defaultPilote.points + "<br>Grand Prix Gagné: " + defaultPilote.win_number + "</p></div>" +
        "<img src='./images/logo/" + defaultPilote.team + ".png' alt='' id='logoImg'></img>"
      );
    }

    window.changeYear = function(change) {
      currentYear += change;
      if (currentYear < 0) {
        currentYear = 0;
      } else if (currentYear >= data.length) {
        currentYear = data.length - 1;
      }
      updateChart(data[currentYear]);
    };

    updateChart(data[currentYear]);
  })
  .catch(function(error) {
    console.error("Erreur lors du chargement des données :", error);
  });

}


function scriptTeams(){

  d3.json("ecuries.json")
    .then(function(data) {
      let currentYear = 0;
      const svg = d3.select("svg");
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  
      function updateChart(yearData) {
        const colorScale = d3.scaleOrdinal()
          .domain(["Ferrari", "McLaren", "Williams", "Renault", "Honda", "Red Bull", "Brawn", "Mercedes", "Lotus", "BMW Sauber"])
          .range(["#C70001", "#FF9100", "#1F54D2", "#04B0E8", "#BBBBBB", "#7A36D0", "#99D41B", "#00D0D2", "#F2CD18", "#C2325B"]);
  
        // Trouver le maximum des points pour l'année en cours
        const maxPoints = d3.max(yearData.ecuries, d => d.points);
        const minHeight = 300;

        // Ajuster la hauteur du SVG en fonction du maximum des points
        const maxPointsWithImage = maxPoints + 110;
        const svgHeight = maxPointsWithImage < minHeight ? minHeight : maxPointsWithImage;

        svg.attr("height", svgHeight);

        const width = +svg.attr("width") - margin.left - margin.right;
        const height = svgHeight - margin.top - margin. bottom;
        svg.attr("height", svgHeight);

  
        const g = svg.selectAll("g")
          .data([null])
          .join("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("height", 250);

        // Constante pour récupérer la div où on affiche les infos sur les écuries
        const infoDiv = d3.select(".info");
        
        const bars = g.selectAll(".bar")
          .data(yearData.ecuries);
  
        bars.join("rect")
          .attr("class", "bar")
          .attr("x", function(d, i) { return i * (width / 3); })
          .attr("y", function(d) { return height - d.points; })
          .attr("height", function(d) { return d.points; })
          .attr("width", width / 3)
          .attr("fill", function(d) { return colorScale(d.name); })
          //Effet d'opacité
          .on("mouseover", function () {
            d3.selectAll(".bar").attr("opacity", 0.7);
            d3.select(this).attr("opacity", 1);
          })
          .on("mouseout", function () {
            d3.selectAll(".bar").attr("opacity", 1);
          })
          //Affiche info Ecuries
          .on("click", function(d,i){
            // Utilise l'index pour accéder aux données correctes
            const selectedEcuries = yearData.ecuries[i];
            // Affiche les données
            infoDiv.html(
              "<img src='./images/logo/" + i.name + ".png' alt='' id='piloteImg'>" + "<div><h3>" + i.name + "</h3><p>Points : " + i.points + "<br>Duo de pilotes :<ul><li>" + i.pilote1 + "</li><li> " + i.pilote2 + "</li></ul></p></div>"
            )
          });
  
        bars.exit().remove();
  
        // Ajout du numéro de rang au bas de chaque rectangle
        const text = g.selectAll(".bar-text")
          .data(yearData.ecuries);
  
        text.join("text")
          .attr("class", "bar-text")
          .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
          .attr("y", function(d) { return height - 10; })
          .text(function(d) { return d.rank; });
  
        text.exit().remove();
  
        // Ajout du nom de l'écurie au bas de chaque rectangle
        const nameText = g.selectAll(".name-text")
          .data(yearData.ecuries);
  
        nameText.join("text")
          .attr("class", "name-text")
          .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
          .attr("y", function(d) { return height + 20; })
          .text(function(d) { return d.name; })
          .attr("text-anchor", "middle");
  
        nameText.exit().remove();
  

        const f1Photo = g.selectAll(".f1Img")
        .data(yearData.ecuries);

      const cheminImage = "images/f1/";

      f1Photo.join("image")
        .attr("class", "f1Img")
        .attr("x", function(d, i) { return i * (width / 3) + (width / 6) - 120; })
        .attr("y", function(d) { return height - d.points - 95; })
        .attr("width", 100)
        .attr("height", 100)
        .attr("xlink:href", function(d) { return cheminImage + yearData.year + d.name + ".png"; });

      f1Photo.exit().remove();

        // Affichage de l'année actuelle
        d3.select("#currentYear").text("Année " + yearData.year);

        // Affiche les infos de l'écurie par défaut
        showDefaultInfo(yearData);
      }

      // Fonction pour sélectionné les données par défaut
      function showDefaultInfo(yearData) {
        const defaultEcurie = yearData.ecuries.find(ecurie => ecurie.rank === 1);

        const infoDiv = d3.select(".info");
        infoDiv.html(
          "<img src='./images/logo/" + defaultEcurie.name + ".png' alt='' id='piloteImg'>" + "<div><h3>" + defaultEcurie.name + "</h3><p>Points : " + defaultEcurie.points + "<br>Duo de pilotes :<ul><li>" + defaultEcurie.pilote1 + "</li><li> " + defaultEcurie.pilote2 + "</li></ul></p></div>"
        );
      }
  
      window.changeYear = function(change) {
        currentYear += change;
        if (currentYear < 0) {
          currentYear = 0;
        } else if (currentYear >= data.length) {
          currentYear = data.length - 1;
        }
        updateChart(data[currentYear]);
      };
  
      updateChart(data[currentYear]);

      d3.select("svg")
        .on("click", function(data){
          d3.selectAll(".histobarre")
          .style("opacity", 0.5)

          d3.select(this)
              .style("opacity",1)
        });

    })
    .catch(function(error) {
      console.error("Erreur lors du chargement des données :", error);
    });
  
  }


  document.addEventListener("DOMContentLoaded", function() {
    scriptPilotes();  // Appele la fonction scriptPilotes par défaut
    document.getElementById("pilotes").addEventListener("click", scriptPilotes);
    document.getElementById("teams").addEventListener("click", scriptTeams);

    // Sélectionner les boutons
    const pilotesButton = document.getElementById("pilotes");
    const teamsButton = document.getElementById("teams");

    // Souligner le bouton actif et désouligner l'autre
    pilotesButton.addEventListener("click", function() {
      scriptPilotes();
      pilotesButton.classList.add("active");
      teamsButton.classList.remove("active");
    });

    teamsButton.addEventListener("click", function() {
      scriptTeams();
      teamsButton.classList.add("active");
      pilotesButton.classList.remove("active");
    });

  });