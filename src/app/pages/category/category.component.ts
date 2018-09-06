import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId: string;
  itemsList: any = [];
  placeholderImage: string = "https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png"
  subscription: Subscription;

  navStart: Observable<NavigationStart>;

  constructor(
    private router: Router,
    private backend: BackendService,
    private activatedRoute: ActivatedRoute
  ) {
    this.navStart = router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.url.subscribe(url => {
      this.categoryId = url[1].path;
      this.loadItemsInCategory(this.categoryId);
    });
  }

  loadItemsInCategory(categoryId) {
    return this.backend.getCategoryItems(this.categoryId)
      .then(result => {
        let resultArr = Object.values(result);
        resultArr.map(item => {
          if (item.photos.length > 0) {
            item.photo = item.photos[0].link;
          } else {
            item.photo = this.placeholderImage;
          }
        })
        this.itemsList = resultArr;
        this.itemsList.sort((a, b) => {
          return b.views - a.views;
        });
        return this.itemsList;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
