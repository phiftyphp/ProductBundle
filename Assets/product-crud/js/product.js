// Generated by CoffeeScript 1.6.3
/*
vim:sw=2:ts=2:sts=2:
*/


(function() {
  var Pager, ProductBulkCopyPlugin, productItemTemplate, productUsecaseItemTemplate, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Product = {};

  Product.initEdit = function() {
    if ($('form#product-resource').get(0)) {
      return Action.form('form#product-resource', {
        clear: true,
        plugins: [ActionMsgbox],
        onSuccess: function(result) {
          return false;
        }
      });
    }
  };

  Product.createResourcePreview = function(data) {
    var $id, $tag;
    $tag = AdminUI.createResourceCover(data, {
      onClose: function(e) {
        return runAction('ProductBundle::Action::DeleteResource', {
          id: data.id
        }, {
          confirm: '確認刪除? ',
          remove: this
        });
      }
    });
    $id = $('<input/>').attr({
      type: 'hidden',
      name: 'resources[' + data.id + '][id]',
      value: data.id
    }).appendTo($tag);
    return $tag;
  };

  Product.createRecipePreview = function(data, rel) {
    var $close, $cover, $id, $img, $title;
    $cover = $('<li/>').addClass('product-recipe');
    if (rel && rel.id) {
      $id = $('<input/>').attr({
        type: 'hidden',
        name: 'product_recipes[' + rel.id + '][id]',
        value: rel.id
      }).appendTo($cover);
    }
    $id = $('<input/>').attr({
      type: 'hidden',
      name: 'product_recipes[' + ((rel && rel.id) || data.id) + '][recipe_id]',
      value: data.id
    }).appendTo($cover);
    if (data.image) {
      $img = $('<img/>').attr({
        src: '/' + data.image,
        alt: data.title,
        title: data.title
      }).appendTo($cover);
    }
    $title = $('<span/>').text(data.title).appendTo($cover);
    $close = $('<div/>').addClass('close').appendTo($cover);
    if (rel && rel.id) {
      $close.click(function() {
        return runAction('ProductBundle::Action::DeleteProductRecipe', {
          id: rel.id
        }, {
          confirm: '確認刪除? ',
          remove: $cover
        });
      });
    } else {
      $close.click(function() {
        return $cover.remove();
      });
    }
    return $cover;
  };

  Product.createFeaturePreview = function(data, rel) {
    var $close, $cover, $featureId, $id, $img;
    $cover = $('<div/>').addClass('feature-cover');
    if (rel && rel.id) {
      $id = $('<input/>').attr({
        type: 'hidden',
        name: 'product_features[' + rel.id + '][id]',
        value: rel.id
      }).appendTo($cover);
    }
    $featureId = $('<input/>').attr({
      type: 'hidden',
      name: 'product_features[' + ((rel && rel.id) || data.id) + '][feature_id]',
      value: data.id
    });
    $img = $('<img/>').attr({
      src: '/' + data.image,
      alt: data.name,
      title: data.name
    });
    $close = $('<div/>').addClass('close');
    if (rel && rel.id) {
      $close.click(function() {
        return runAction('ProductBundle::Action::DeleteFeatureRel', {
          id: rel.id
        }, {
          confirm: '確認刪除? ',
          remove: $cover
        });
      });
    } else {
      $close.click(function() {
        return $cover.remove();
      });
    }
    return $cover.append($img).append($close).append($featureId);
  };

  Product.createTypeBox = function(data) {
    var $close, $id, $name, $tag;
    $tag = $('<div/>').addClass('text-tag');
    $name = $('<div/>').addClass('name').html(data.name).appendTo($tag);
    $close = $('<div/>').addClass('close').click(function() {
      return runAction('ProductBundle::Action::DeleteProductType', {
        id: data.id
      }, {
        confirm: '確認刪除? ',
        remove: $tag
      });
    });
    $tag.append($close);
    $id = $('<input/>').attr({
      type: 'hidden',
      name: 'types[' + data.id + '][id]',
      value: data.id
    }).appendTo($tag);
    return $tag;
  };

  Product.createFileCover = function(data) {
    var $close, $id, $tag;
    $tag = AdminUI.createFileCover(data);
    $close = $('<div/>').addClass('close').click(function() {
      return runAction('ProductBundle::Action::DeleteProductFile', {
        id: data.id
      }, {
        confirm: '確認刪除? ',
        remove: $tag
      });
    });
    $close.appendTo($tag);
    $id = $('<input/>').attr({
      type: 'hidden',
      name: 'files[' + data.id + '][id]',
      value: data.id
    }).appendTo($tag);
    return $tag;
  };

  productUsecaseItemTemplate = CoffeeKup.compile(function() {
    return div({
      "class": "product-cover col-md-3"
    }, function() {
      var index;
      index = this.usecase_id;
      if (this.id) {
        input({
          "class": "record-id",
          name: "product_usecases[" + index + "][id]",
          type: "hidden",
          value: this.id
        });
      }
      input({
        name: "product_usecases[" + index + "][usecase_id]",
        type: "hidden",
        value: this.usecase_id
      });
      if (this.product_id) {
        input({
          name: "product_usecases[" + index + "][product_id]",
          type: "hidden",
          value: this.product_id
        });
      }
      return div({
        "class": "image-cover"
      }, function() {
        if (this.thumb) {
          div({
            "class": "cut"
          }, function() {
            return img({
              src: "/" + this.thumb
            });
          });
        }
        div({
          "class": "title"
        }, function() {
          return this.name;
        });
        return div({
          "class": "close"
        }, function() {});
      });
    });
  });

  productItemTemplate = CoffeeKup.compile(function() {
    return div({
      "class": "product-cover col-md-4"
    }, function() {
      var index;
      index = this.related_product_id;
      if (this.id) {
        input({
          "class": "record-id",
          name: "product_products[" + index + "][id]",
          type: "hidden",
          value: this.id
        });
      }
      input({
        name: "product_products[" + index + "][related_product_id]",
        type: "hidden",
        value: this.related_product_id
      });
      if (this.product_id) {
        input({
          name: "product_products[" + index + "][product_id]",
          type: "hidden",
          value: this.product_id
        });
      }
      return div({
        "class": "image-cover"
      }, function() {
        if (this.thumb) {
          div({
            "class": "cut"
          }, function() {
            return img({
              src: "/" + this.thumb
            });
          });
        }
        div({
          "class": "title"
        }, function() {
          return this.name;
        });
        return div({
          "class": "close"
        }, function() {});
      });
    });
  });

  Product.ProductProductItemView = (function(_super) {
    __extends(ProductProductItemView, _super);

    function ProductProductItemView() {
      _ref = ProductProductItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProductProductItemView.prototype.render = function() {
      var $el, config, self;
      self = this;
      config = this.config;
      $el = $(productItemTemplate(this.data));
      $el.find('.close').click(function(e) {
        if (self.data.id) {
          runAction("ProductBundle::Action::DeleteProductProduct", {
            id: self.data.id
          }, {
            confirm: '確認刪除? ',
            remove: $el
          });
        } else {
          $el.remove();
        }
        return false;
      });
      return $el;
    };

    return ProductProductItemView;

  })(CRUDList.BaseItemView);

  Product.ProductUseCaseItemView = (function(_super) {
    __extends(ProductUseCaseItemView, _super);

    function ProductUseCaseItemView() {
      _ref1 = ProductUseCaseItemView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ProductUseCaseItemView.prototype.render = function() {
      var $el, config, self;
      self = this;
      config = this.config;
      $el = $(productUsecaseItemTemplate(this.data));
      $el.find('.close').click(function(e) {
        if (self.data.id) {
          runAction("ProductBundle::Action::DeleteProductUseCase", {
            id: self.data.id
          }, {
            confirm: '確認刪除? ',
            remove: $el
          });
        } else {
          $el.remove();
        }
        return false;
      });
      return $el;
    };

    return ProductUseCaseItemView;

  })(CRUDList.BaseItemView);

  Product.createProductImageThumb = function(data) {
    var $id, $imageCover;
    $imageCover = AdminUI.createImageCover(data, {
      onClose: function(e) {
        return runAction('ProductBundle::Action::DeleteProductImage', {
          id: data.id
        }, {
          confirm: '確認刪除? ',
          remove: this
        });
      }
    });
    $id = $('<input/>').attr({
      type: 'hidden',
      name: 'images[' + data.id + '][id]',
      value: data.id
    }).appendTo($imageCover);
    return $imageCover;
  };

  Product.Category = {};

  Product.Category.createFileCover = function(data) {
    var $close, $id, $tag;
    $tag = AdminUI.createFileCover(data);
    $close = $('<div/>').addClass('close').click(function() {
      return runAction('ProductBundle::Action::DeleteCategoryFile', {
        id: data.id
      }, {
        confirm: '確認刪除? ',
        remove: $tag
      });
    });
    $close.appendTo($tag);
    $id = $('<input/>').attr({
      type: 'hidden',
      name: 'files[' + data.id + '][id]',
      value: data.id
    }).appendTo($tag);
    return $tag;
  };

  Product.Category.init = function() {
    return $('#add-category-file').click(function(e) {
      var dialog;
      return dialog = new CRUDDialog('/bs/product_category_file/crud/dialog', {}, {
        onSuccess: function(resp) {
          return Product.Category.createFileCover(resp.data).appendTo('#category-files');
        }
      });
    });
  };

  /*
  */


  window.ProductBulkConvertPlugin = (function() {
    function ProductBulkConvertPlugin() {}

    ProductBulkConvertPlugin.prototype.register = function(bulk) {
      return bulk.addMenuItem('zh_convert', '簡繁轉換', function(btn) {
        var $select, content, label, lang, options, runbtn;
        content = $('<div/>');
        options = {
          '': '--請選擇--',
          to_tw: '簡體轉繁體',
          to_cn: '繁體轉簡體'
        };
        $select = $('<select/>');
        for (lang in options) {
          label = options[lang];
          $select.append(new Option(label, lang));
        }
        runbtn = $('<input/>').attr({
          type: 'button'
        }).val('開始轉換').click(function() {
          return bulk.runBulkAction('ZhConvert', {
            convertion: $select.val()
          }, function(resp) {
            if (resp.success) {
              $.jGrowl(resp.message);
              return setTimeout((function() {
                Region.of(bulk.table).refreshWith({
                  page: 1
                });
                return content.dialog('close');
              }), 800);
            } else {
              return $.jGrowl(resp.message, {
                theme: 'error'
              });
            }
          });
        });
        return content.append($select).append(runbtn).dialog();
      });
    };

    return ProductBulkConvertPlugin;

  })();

  ProductBulkCopyPlugin = (function() {
    function ProductBulkCopyPlugin() {}

    ProductBulkCopyPlugin.prototype.register = function(bulk) {
      return bulk.addMenuItem('copy', '複製...', function(btn) {
        var $langsel, $productCateSel, cate, content, label, lang, option, runbtn, _i, _len, _ref2;
        content = $('<div/>');
        $langsel = $('<select/>');
        option = document.createElement("option");
        option.innerHTML = "--語言--";
        $langsel.append(option);
        for (lang in Languages) {
          label = Languages[lang];
          option = document.createElement("option");
          option.innerHTML = label;
          option.value = lang;
          $langsel.append(option);
        }
        $productCateSel = $('<select/>');
        _ref2 = window.Product.categories;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          cate = _ref2[_i];
          option = document.createElement("option");
          option.innerHTML = cate.name;
          option.value = cate.id;
          $productCateSel.append(option);
        }
        runbtn = $('<input/>').attr({
          type: 'button'
        }).val('複製').click(function() {
          return bulk.runBulkAction('Copy', {
            lang: $langsel.val(),
            category_id: $productCateSel.val()
          }, function(result) {
            if (result.success) {
              $.jGrowl(result.message);
              return setTimeout((function() {
                Region.of(bulk.table).refreshWith({
                  page: 1
                });
                return content.dialog('close');
              }), 800);
            } else {
              return $.jGrowl(result.message, {
                theme: 'error'
              });
            }
          });
        });
        return content.attr({
          title: '複製'
        }).append($langsel).append($productCateSel).append(runbtn).dialog();
      });
    };

    return ProductBulkCopyPlugin;

  })();

  Pager = (function() {
    function Pager(config) {
      this.config = config;
      this.container = $('<div/>').addClass('pager');
      this.page = this.config.page || 1;
      this.pages = this.config.pages || Math.ceil(this.config.totalItems / this.config.pageSize);
    }

    Pager.prototype.next = function() {
      if (this.page < this.pages) {
        return this.page++;
      } else {
        return this.page;
      }
    };

    Pager.prototype.prev = function() {
      if (this.page > 1) {
        return this.page--;
      } else {
        return this.page;
      }
    };

    Pager.prototype.render = function(el) {
      this.updateUI();
      return this.container.appendTo(el);
    };

    Pager.prototype.updateUI = function() {
      var $nextPage, $prevPage,
        _this = this;
      this.container.empty();
      if (this.page > 1) {
        $prevPage = $('<a/>').text('上一頁').appendTo(this.container).click(function(e) {
          _this.prev();
          if (_this.config.onPage) {
            _this.config.onPage(_this);
          }
          return _this.updateUI();
        });
      }
      if (this.page < this.pages) {
        return $nextPage = $('<a/>').text('下一頁').appendTo(this.container).click(function(e) {
          _this.next();
          if (_this.config.onPage) {
            _this.config.onPage(_this);
          }
          return _this.updateUI();
        });
      }
    };

    return Pager;

  })();

  Product.Chooser = (function() {
    function Chooser(container, onChoose) {
      var _this = this;
      this.container = container;
      this.onChoose = onChoose;
      this.dialog = $('<div/>').dialog({
        width: 900,
        height: 500,
        modal: true
      });
      this.update(1, function(resp) {
        _this.pager = new Pager({
          pages: resp.pages,
          page: _this.page,
          onPage: function(pager) {
            return _this.update(pager.page);
          }
        });
        _this.pager.render(_this.dialog);
        return _this.itemlist = $('<div/>').addClass('items').appendTo(_this.dialog);
      });
    }

    Chooser.prototype.update = function(page, cb) {
      var _this = this;
      return $.getJSON("/=/product/search", {
        page: page
      }, function(resp) {
        var product, _i, _len, _ref2, _results;
        if (cb) {
          cb(resp);
        }
        _this.itemlist.empty();
        _ref2 = resp.products;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          product = _ref2[_i];
          _results.push((function(product) {
            var $btn, $cover;
            $cover = AdminUI.createImageCover({
              thumb: product.thumb,
              image: product.image,
              title: product.name
            });
            $btn = $('<button/>').text('選擇');
            $btn.appendTo($cover);
            $btn.click(function(e) {
              if (_this.onChoose) {
                _this.onChoose(product);
              }
              runAction("ProductBundle::Action::CreateProductProduct", {
                related_product_id: product.id
              }, function(resp) {
                var coverView;
                console.log(resp);
                coverView = new CRUDList.ImageItemView({
                  deleteAction: "ProductBundle::Action::DeleteProductProduct",
                  relation: "product_products"
                }, {
                  id: resp.data.id,
                  thumb: product.thumb,
                  image: product.image,
                  title: product.name
                });
                return coverView.appendTo(_this.container);
              });
              return _this.dialog.dialog('close');
            });
            return $cover.appendTo(_this.itemlist);
          })(product));
        }
        return _results;
      });
    };

    return Chooser;

  })();

  Product.init = function() {};

  window.ProductBulkCopyPlugin = ProductBulkCopyPlugin;

}).call(this);