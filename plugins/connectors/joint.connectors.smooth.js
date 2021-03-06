joint.connectors.smooth = function(sourcePoint, targetPoint, vertices) {

    var path;

    if (vertices && vertices.length !== 0) {

        var points = [sourcePoint].concat(vertices).concat([targetPoint]);

        var curves = g.Curve.throughPoints(points);
        path = new g.Path(curves);

    } else {
        // if we have no vertices, use a default cubic bezier curve
        // cubic bezier requires two control points
        // the control points have `x` midway between source and target
        // this produces an S-like curve

        path = new g.Path();

        var segment;

        segment = g.Path.createSegment('M', sourcePoint);
        path.appendSegment(segment);

        if ((Math.abs(sourcePoint.x - targetPoint.x)) >= (Math.abs(sourcePoint.y - targetPoint.y))) {
            var controlPointX = (sourcePoint.x + targetPoint.x) / 2;

            segment = g.Path.createSegment('C', controlPointX, sourcePoint.y, controlPointX, targetPoint.y, targetPoint.x, targetPoint.y);
            path.appendSegment(segment);

        } else {
            var controlPointY = (sourcePoint.y + targetPoint.y) / 2;

            segment = g.Path.createSegment('C', sourcePoint.x, controlPointY, targetPoint.x, controlPointY, targetPoint.x, targetPoint.y);
            path.appendSegment(segment);

        }
    }

    return path.serialize();
};
