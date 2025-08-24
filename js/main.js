(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

console.log('[skills] main.js loaded');

(function(){
  const root = document.querySelector('#skills-bubble-root');
  if(!root || typeof d3 === 'undefined') return;
  
  const skills = [
    // value is bubble size (higher = bigger)
    { name:'Python', value:10 },
    { name:'SQL', value:10 },
    { name:'Statistics', value:10 },
    { name:'Pandas', value:10 },
    { name:'NumPy', value:10 },
    { name:'Excel', value:10 },
    { name:'Tableau', value:10 },
    { name:'Power BI', value:10 },
    { name:'Git', value:5 },
    { name:'AWS', value:10 },
    { name:'Azure', value:10 },
    { name:'GCP', value:5 },
    { name:'BigQuery', value:10 },
    { name:'Snowflake', value:10 },
    { name:'Spark', value:10 },
    { name:'TensorFlow', value:8 },
    { name:'PyTorch', value:8 },
    { name:'R', value:5 },
    { name:'Hadoop', value:7 },
    { name:'Hive', value:5 },
    { name:'Looker', value:7 },
    { name:'Matlab', value:6 }
  ];
  
  const CONFIG = { minR:24, maxR:86, charge:+6, collidePad:2, velDecay:0.50, centering:0.08 };
  
  const wrap = d3.select(root);
  
  // Create SVG first
  const svg = d3.select(root).append('svg');

  // Function to compute width/height with mobile optimization
  function computeSize(){
    const W = root.clientWidth || 1100;
    const isMobile = W < 768;
    const H = isMobile ? 400 : 520;  // shorter height on mobile
    svg.attr('viewBox', `0 0 ${W} ${H}`)
       .attr('width', '100%')
       .attr('height', H);
    return { W, H, isMobile };
  }

  // Call once to set initial size
  let { W, H, isMobile } = computeSize();

  // On resize, recompute
  window.addEventListener('resize', () => {
    const s = computeSize(); W = s.W; H = s.H; isMobile = s.isMobile;
    sim.force('center', d3.forceCenter(W/2, H/2));
    sim.force('x', d3.forceX(W/2).strength(0.14));
    sim.force('y', d3.forceY(H/2).strength(0.02));
    sim.alpha(0.25).restart();
  });
  const g = svg.append('g');
  
  // Radius range (keeps sizes readable without crushing others):
  const r = d3.scaleSqrt()
    .domain([d3.min(skills, d => d.value), d3.max(skills, d => d.value)])
    .range(isMobile ? [14, 50] : [18, 70]); // smaller bubbles on mobile
    
  const BAND = isMobile ? 120 : 160;  // smaller band on mobile
  const nodes = skills.map(d => ({
    ...d,
    x: Math.random() * W,
    y: H/2 + (Math.random() - 0.5) * BAND
  }));
  
  const node = g.selectAll('g').data(nodes).enter().append('g').attr('class','bubble');
  
  // Purple/black theme palette + fill:
  const PALETTE = [
    '#2F2740', // deep plum (brand base)
    '#503B57', // dark purple
    '#6E5077', // purple
    '#8B6A95', // light purple
    '#B37BBE', // lavender
    '#D278B8', // pink-purple
    '#1F2124'  // charcoal (near-black accent)
  ];
  
  node.append('circle')
    .attr('r', d => r(d.value))
    .attr('fill', (d,i) => PALETTE[i % PALETTE.length])
    .attr('stroke', '#00000020')
    .attr('stroke-width', 1.5);
    
  // Label legibility (auto-size to bubble):
  node.append('text')
    .text(d => d.name)
    .attr('fill', '#FFFFFF')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-weight', 700)
    .style('font-size', d => Math.max(isMobile ? 9 : 11, Math.min(isMobile ? 14 : 18, r(d.value) * 0.35)) + 'px')
    .each(function(d){
      const el = this;
      const maxChars = Math.floor((r(d.value) * (isMobile ? 1.4 : 1.6)) / (isMobile ? 6 : 7));  // rough fit
      if (el.textContent.length > maxChars) {
        el.textContent = el.textContent.slice(0, Math.max(0,maxChars-1)) + '…';
      }
    });
  
  // Softer physics (more space, no crowding):
  const sim = d3.forceSimulation(nodes)
    .velocityDecay(0.55)
    .force('center', d3.forceCenter(W/2, H/2))
    .force('charge', d3.forceManyBody().strength(isMobile ? -12 : -16).distanceMax(isMobile ? 280 : 320))
    .force('collide', d3.forceCollide().radius(d => r(d.value) + (isMobile ? 4 : 6)).strength(1))
    .force('x', d3.forceX(W/2).strength(0.14))   // stronger horizontal centering
    .force('y', d3.forceY(H/2).strength(0.02))   // very light vertical pull
    .on('tick', onTick);

  function onTick(){
    for (const n of nodes){
      // keep inside canvas
      const pad = r(n.value) + 2;
      if (n.x < pad) n.x = pad;
      if (n.x > W - pad) n.x = W - pad;

      // soft vertical limits to encourage horizontal spread
      const top = (H/2 - BAND/1.15), bot = (H/2 + BAND/1.15);
      if (n.y < top) n.y = top;
      if (n.y > bot) n.y = bot;
    }
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  }

  // Convert client coords to SVG coords
  function toSvgXY(evt){
    const pt = svg.node().createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const res = pt.matrixTransform(svg.node().getScreenCTM().inverse());
    return { x: res.x, y: res.y };
  }

  // Tiny, throttled impulse toward the cursor/touch
  let lastKick = 0;
  function tinyKick(d, evt){
    const now = performance.now();
    if (now - lastKick < (isMobile ? 200 : 140)) return;  // slower throttle on mobile
    lastKick = now;

    const { x:mx, y:my } = toSvgXY(evt);
    const dx = mx - d.x, dy = my - d.y;
    const len = Math.hypot(dx, dy) || 1;

    const K = isMobile ? 0.08 : 0.12;        // gentler impulse on mobile
    d.vx += (dx/len) * K;
    d.vy += (dy/len) * K;

    if (sim.alpha() < 0.06) sim.alpha(0.06); // wake gently
  }

  // Enhanced touch/mouse interactions
  node
    .on('mouseenter touchstart', (e,d) => {
      e.currentTarget.classList.add('is-focus');      // purely visual (CSS)
      if (typeof showTip === 'function') showTip(`${d.name} — ${d.value}%`, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
      tinyKick(d, e);                                  // one small kick
    })
    .on('mousemove touchmove', (e,d) => {
      if (typeof showTip === 'function') showTip(`${d.name} — ${d.value}%`, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
      tinyKick(d, e);                                  // throttled → at most ~7 kicks/sec
    })
    .on('mouseleave touchend', (e,d) => {
      e.currentTarget.classList.remove('is-focus');
      if (typeof hideTip === 'function') hideTip();
    });
  
  const drag = d3.drag()
    .on('start', (event,d)=>{ 
      if(!event.active) sim.alphaTarget(0.04).restart(); 
      d.fx=d.x; d.fy=d.y; 
      // Prevent default touch behavior on mobile
      if(event.sourceEvent && event.sourceEvent.type === 'touchstart') {
        event.sourceEvent.preventDefault();
      }
    })
    .on('drag',  (event,d)=>{ 
      d.fx=event.x; d.fy=event.y; 
      // Prevent default touch behavior on mobile
      if(event.sourceEvent && event.sourceEvent.type === 'touchmove') {
        event.sourceEvent.preventDefault();
      }
    })
    .on('end',   (event,d)=>{ 
      if(!event.active) sim.alphaTarget(0); 
      d.fx=null; d.fy=null; 
    });

  node.call(drag);
})();
