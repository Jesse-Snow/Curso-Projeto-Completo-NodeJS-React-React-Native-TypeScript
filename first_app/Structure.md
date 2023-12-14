- Structure
 - Componente App 
   - JSX 
     - div 
     - cabeçalho
     - form
       * evento
         - handleSubmit
           -- faz o texto do input da tarefa 
              ser armazenado no state das
              tarefas
       - input texto
       - input do tipo submit
     - div 
      - lista
        - tarefas
  
  - Ciclos de vida
    - Ao montar componente
      - Se existir dados no localstorage,
        irá trazer os dados para o state 
        tarefa
    - Ao state tarefa ser alterado
      - Se o array de tarefa for maior que 0,
        guardar esse array no localstorage