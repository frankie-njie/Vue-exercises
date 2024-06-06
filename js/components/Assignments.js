import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from './AssignmentCreate.js';

export default {
  components: { AssignmentList, AssignmentCreate },
  /*html*/
  template: `
    <section class="flex gap-8">
      <assignment-list :assignments="filters.inProgress" title="In Progress">
        <assignment-create @add="add"></assignment-create>
      </assignment-list>
      <assignment-list 
        v-if="showCompleted"
        :assignments="filters.completed" 
        can-Toggle 
        title="Completed" 
        @toggle="showCompleted = !showCompleted"
       >
      </assignment-list>

      <!-- <assignment-create @add="add"></assignment-create> -->
    
    </section>
    `,

  data() {
    return {
      assignments: [
        // { name: "Finish project", complete: false, id: 1, tag: "math" },
        // { name: "Read Chapter 4", complete: false, id: 2, tag: "science" },
        // { name: "Turn in Homeowork", complete: false, id: 3, tag: "math" },
      ],
      showCompleted: false,

      newAssignment : ''
    };
  },

  computed: {
    filters (){
      return {
        inProgress: this.assignments.filter((assignment) => !assignment.complete),
        completed : this.assignments.filter((assignment) => assignment.complete),
      }
    }
  },

  created() {
    fetch('http://localhost:3000/assignment')
    .then(response => response.json())
    .then(assignments => {this.assignments = assignments})
  },

  methods: {
    add(name) { 
      this.assignments.push({
        name: name,
        completed: false,
        id: this.assignments.length + 1
      });
      this.newAssignment =  '';
    }
  },
};
