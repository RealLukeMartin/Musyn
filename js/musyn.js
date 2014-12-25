var context = new AudioContext(); // Create audio container

oscillator = context.createOscillator(); // Create sound source 
oscillator.connect(context.destination); // Connect sound to speakers 
oscillator.start(); // Generate sound instantly