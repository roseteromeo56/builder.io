#!/usr/bin/env node

import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\n🏗️  Builder.io Monorepo Development Menu 🏗️\n');
console.log('Select which part of the monorepo you want to work on:\n');
console.log('1. SDK Development (packages/sdks)');
console.log('2. SDK Tests (packages/sdks-tests)');
console.log('3. React SDK');
console.log('4. Angular SDK');
console.log('5. Vue SDK');
console.log('6. Qwik SDK');
console.log('7. Solid SDK');
console.log('8. React Native SDK');
console.log('9. NextJS RSC SDK');
console.log('0. Exit\n');

rl.question('Enter your choice (0-9): ', answer => {
  const choice = answer.trim();

  const commands = {
    1: 'cd packages/sdks && yarn start',
    2: 'cd packages/sdks-tests && yarn dev',
    3: 'cd packages/sdks && yarn start:react',
    4: 'cd packages/sdks && yarn start:angular',
    5: 'cd packages/sdks && yarn start:vue',
    6: 'cd packages/sdks && yarn start:qwik',
    7: 'cd packages/sdks && yarn start:solid',
    8: 'cd packages/sdks && yarn start:reactNative',
    9: 'cd packages/sdks && yarn start:rsc',
    0: 'exit',
  };

  if (commands[choice]) {
    const command = commands[choice];
    console.log(`\nRunning: ${command}\n`);

    if (choice === '0') {
      console.log('Exiting interactive development menu.');
      process.exit(0);
    } else {
      const [cmd, ...args] = command.split(' ');
      const child = spawn(cmd, args, { stdio: 'inherit', shell: true });

      child.on('close', code => {
        if (code === 0) {
          console.log('\nCommand executed successfully.');
        } else {
          console.error(`\nCommand failed with exit code ${code}.`);
        }
        rl.close();
      });
    }
  } else {
    console.log('Invalid choice. Please run the script again and select a valid option (0-9).');
  }

  rl.close();
});
