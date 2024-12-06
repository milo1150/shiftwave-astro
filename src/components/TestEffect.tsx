import { Effect, Console } from 'effect'

export default function TestEffect() {
  const program = Console.log('Hello, World!')
  Effect.runSync(program)
  return <div>TestEffect</div>
}
