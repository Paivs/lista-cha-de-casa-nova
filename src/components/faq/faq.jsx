export default function faq({ pergunta, resposta }) {
  return (
    <>
      <details className="my-4" open>
        <summary className="font-bold text-3xl cursor-pointer">
          {pergunta}
        </summary>
        <p className="text-2xl my-1">{resposta}</p>
      </details>
    </>
  );
}
