import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { ActivatedRoute, Params} from "@angular/router";
import { DataService} from '../../services/data.service';


@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {

  problem: Problem;


  constructor(
    private dataService: DataService,
  	private route: ActivatedRoute,
  	@Inject("data") private data
  ) { }

  ngOnInit() {

  this.route.params.subscribe(params => {
  	this.data.getProblem(+params["id"])
    .then(problem => this.problem = problem);


  });
  }

}
